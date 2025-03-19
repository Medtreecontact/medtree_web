'use client';

import { Station } from '@/entities/models/station';
import { sendMessageToGemini } from '@/app/actions/ia_actions';
import { useState } from 'react';
import { DoctorInformation } from './DoctorInformation';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { CostDisplay } from './CostDisplay';
import { AnnexModal } from './AnnexModal';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface ConversationCost {
  inputTokens: number;
  outputTokens: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
}

interface AnnexModalState {
  isOpen: boolean;
  type: 'text' | 'image' | null;
  content?: string;
  path?: string;
  title?: string;
  index: number;
}

export function ChatInterface({ station }: { station: Station }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [showCost, setShowCost] = useState(false);
  const [conversationCost, setConversationCost] = useState<ConversationCost>({
    inputTokens: 0,
    outputTokens: 0,
    inputCost: 0,
    outputCost: 0,
    totalCost: 0
  });
  
  // Modal state for annex viewing
  const [annexModal, setAnnexModal] = useState<AnnexModalState>({
    isOpen: false,
    type: null,
    index: -1
  });
  
  // Open annex modal
  const openAnnexModal = (type: 'text' | 'image', index: number, content?: string, path?: string, title?: string) => {
    setAnnexModal({
      isOpen: true,
      type,
      content,
      path,
      title,
      index
    });
  };

  // Close annex modal
  const closeAnnexModal = () => {
    setAnnexModal({
      isOpen: false,
      type: null,
      index: -1
    });
  };
  
  // Start the chat with initial message
  async function startChat() {
    if (isLoading || isChatStarted) return;
    
    setIsLoading(true);
    
    try {
      // Send empty message to get the initial response
      const initialMessage: Message = { role: 'user', content: "Bonjour" };
      const response = await sendMessageToGemini([initialMessage], station);
      
      // Add AI response to chat
      setMessages([
        { role: 'model', content: response.text }
      ]);
      
      setIsChatStarted(true);
      
      // Update cost tracking
      setConversationCost({
        inputTokens: response.cost.inputTokens,
        outputTokens: response.cost.outputTokens,
        inputCost: response.cost.inputCost,
        outputCost: response.cost.outputCost,
        totalCost: response.cost.totalCost
      });
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([{ 
        role: 'model', 
        content: "Sorry, I couldn't start the conversation. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  }
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message to chat
    const newMessage: Message = { role: 'user', content: inputValue.trim() };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Send message to Gemini
      const response = await sendMessageToGemini([...messages, newMessage], station);
      
      // Add AI response to chat
      setMessages(prev => [...prev, { role: 'model', content: response.text }]);
      
      // Update cost tracking
      setConversationCost(prev => ({
        inputTokens: prev.inputTokens + response.cost.inputTokens,
        outputTokens: prev.outputTokens + response.cost.outputTokens,
        inputCost: prev.inputCost + response.cost.inputCost,
        outputCost: prev.outputCost + response.cost.outputCost,
        totalCost: prev.totalCost + response.cost.totalCost
      }));
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "Sorry, I'm having trouble responding right now. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="flex h-full">
      {/* Doctor Information Sidebar */}
      <div className="w-1/3 bg-gray-50 border-r h-full overflow-hidden">
        <DoctorInformation 
          station={station} 
          openAnnexModal={openAnnexModal} 
        />
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Cost display panel */}
        <CostDisplay showCost={showCost} conversationCost={conversationCost} />
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="max-w-3xl mx-auto h-full">
            <ChatMessages 
              messages={messages}
              isLoading={isLoading}
              isChatStarted={isChatStarted}
              startChat={startChat}
            />
          </div>
        </div>
        
        {/* Input area */}
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isChatStarted={isChatStarted}
          startChat={startChat}
          showCost={showCost}
          setShowCost={setShowCost}
        />
      </div>
      
      {/* Annex Modal */}
      <AnnexModal
        isOpen={annexModal.isOpen}
        type={annexModal.type}
        content={annexModal.content}
        path={annexModal.path}
        title={annexModal.title}
        index={annexModal.index}
        closeAnnexModal={closeAnnexModal}
      />
    </div>
  );
}