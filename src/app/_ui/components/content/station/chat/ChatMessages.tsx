import React, { useRef, useEffect } from 'react';
import { Loader2, PlayCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  isChatStarted: boolean;
  startChat: () => void;
}

export function ChatMessages({ messages, isLoading, isChatStarted, startChat }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  if (!isChatStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center mb-8 max-w-md">
          <h3 className="text-xl font-bold mb-2">Begin Patient Interaction</h3>
          <p className="text-gray-600">
            You'll interact with a virtual patient based on the medical scenario. 
            Use the information in the left panel to guide your conversation.
          </p>
        </div>
        <button
          onClick={startChat}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <PlayCircle className="w-5 h-5" />
          )}
          Start Discussion
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-[80%] rounded-lg p-3 ${
              message.role === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white border border-gray-200'
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-lg p-3 bg-white border border-gray-200">
            <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}