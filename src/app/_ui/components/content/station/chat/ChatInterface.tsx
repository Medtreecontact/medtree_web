'use client';

import { Station } from '@/entities/models/station';
import { sendMessageToGemini } from '@/app/actions/ai_actions';
import { useState, useEffect } from 'react';
import { DoctorInformation } from './DoctorInformation';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { AnnexModal } from './AnnexModal';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface AnnexModalState {
  isOpen: boolean;
  type: 'text' | 'image' | null;
  content?: string;
  path?: string;
  title?: string;
  index: number;
}

export interface TimerState {
  isActive: boolean;
  isPaused: boolean;
}

interface ChatInterfaceProps {
  station: Station;
  onTimerStateChange?: (isActive: boolean, isPaused: boolean) => void;
  onMessagesUpdate?: (messages: Message[]) => void;
}

export function ChatInterface({ station, onTimerStateChange, onMessagesUpdate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  
  const [timerState, setTimerState] = useState<TimerState>({
    isActive: false,
    isPaused: false
  });

  useEffect(() => {
    if (onTimerStateChange) {
      onTimerStateChange(timerState.isActive, timerState.isPaused);
    }
  }, [timerState.isActive, timerState.isPaused, onTimerStateChange]);
  
  useEffect(() => {
    if (onMessagesUpdate) {
      onMessagesUpdate(messages);
    }
  }, [messages, onMessagesUpdate]);
  
  const [annexModal, setAnnexModal] = useState<AnnexModalState>({
    isOpen: false,
    type: null,
    index: -1
  });
  
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

  const closeAnnexModal = () => {
    setAnnexModal({
      isOpen: false,
      type: null,
      index: -1
    });
  };
  
  async function startChat() {
    if (isLoading || isChatStarted) return;
    
    setTimerState({
      isActive: true,
      isPaused: true 
    });
    
    setIsLoading(true);
    
    try {
      const initialMessage: Message = { role: 'user', content: "Bonjour, bienvenue au cabinet que vous arrive t-il ?" };
      setMessages([
        { role: 'user', content: initialMessage.content }
      ]);
      const response = await sendMessageToGemini([initialMessage], station);
      
      const displayContent = response.text === "HORS CONTEXTE" 
        ? "Ce message semble hors du contexte de la station, il à été ignoré." 
        : response.text;
      
      setMessages(prev => [...prev,
        { role: 'model', content: displayContent }
      ]);
      
      setIsChatStarted(true);
      
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "Désolé, je rencontre des difficultés à répondre pour le moment. Veuillez réessayer." 
      }]);
    } finally {
      setIsLoading(false);
      setTimerState(prev => ({
        ...prev,
        isPaused: false
      }));
    }
  }
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    setTimerState(prev => ({
      ...prev,
      isPaused: true
    }));
    
    const newMessage: Message = { role: 'user', content: inputValue.trim() };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const response = await sendMessageToGemini([...messages, newMessage], station);
      
      const displayContent = response.text.trim() === "HORS CONTEXTE" 
        ? "Ce message semble hors du contexte de la station, il à été ignoré" 
        : response.text;

      setMessages(prev => [...prev, { role: 'model', content: displayContent }]);
      
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "Désolé, je rencontre des difficultés à répondre pour le moment. Veuillez réessayer." 
      }]);
    } finally {
      setIsLoading(false);
      setTimerState(prev => ({
        ...prev,
        isPaused: false
      }));
    }
  }
  
  return (
    <div className="flex h-full">
      <div className="w-1/3 bg-gray-50 border-r h-full overflow-hidden shadow-inner">
        <DoctorInformation 
          station={station} 
          openAnnexModal={openAnnexModal} 
        />
      </div>
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-5 bg-gray-50/70">
          <div className="max-w-3xl mx-auto h-full">
            <ChatMessages 
              messages={messages}
              isLoading={isLoading}
              isChatStarted={isChatStarted}
              startChat={startChat}
            />
          </div>
        </div>
        
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isChatStarted={isChatStarted}
          startChat={startChat}
        />
      </div>
      
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