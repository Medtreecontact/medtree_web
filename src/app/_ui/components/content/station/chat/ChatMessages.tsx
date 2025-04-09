import React, { useRef, useEffect } from 'react';
import { Loader2, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  if (!isChatStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center mb-8 max-w-md p-6 bg-white/80 rounded-lg backdrop-blur-sm shadow-sm">
          <h3 className="text-xl font-bold mb-3 text-blue-700">Simulation de consultation</h3>
          <p className="text-gray-600">
            Vous allez interagir avec un patient virtuel basé sur un scénario médical.
            Lorsque la consultation sera terminée, vous recevrez une analyse de la conversation et une note.
          </p>
        </div>
        <button
          onClick={startChat}
          disabled={isLoading}
          className="flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
          disabled:opacity-50 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <PlayCircle className="w-5 h-5" />
          )}
          Démarrer la consultation
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 px-1">
      {messages.map((message, index) => (
        <motion.div 
          key={index} 
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div 
            className={`max-w-[80%] rounded-lg p-4 shadow-sm ${
              message.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white border border-gray-200'
            }`}
          >
            <p className="whitespace-pre-wrap text-[15px]">{message.content}</p>
          </div>
        </motion.div>
      ))}
      
      {isLoading && (
        <motion.div 
          className="flex justify-start"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="max-w-[80%] rounded-lg p-4 bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
              <span className="text-gray-500 text-sm">En cours de rédaction...</span>
            </div>
          </div>
        </motion.div>
      )}
      
      <div ref={messagesEndRef} className="h-4" />
    </div>
  );
}