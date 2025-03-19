import React from 'react';
import { DollarSign, Loader2, PlayCircle, Send } from 'lucide-react';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isChatStarted: boolean;
  startChat: () => void;
  showCost: boolean;
  setShowCost: (show: boolean) => void;
}

export function ChatInput({
  inputValue,
  setInputValue,
  handleSubmit,
  isLoading,
  isChatStarted,
  startChat,
  showCost,
  setShowCost
}: ChatInputProps) {
  return (
    <div className="bg-white border-t p-4">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <button 
          onClick={() => setShowCost(!showCost)} 
          className="text-gray-500 hover:text-blue-500 p-2"
        >
          <DollarSign size={18} />
        </button>
        
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2 mx-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isChatStarted ? "Type your message..." : "Start the discussion to begin chatting..."}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading || !isChatStarted}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim() || !isChatStarted}
            className="bg-blue-500 text-white p-2 rounded-lg disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
        
        {!isChatStarted && (
          <button
            onClick={startChat}
            disabled={isLoading}
            className="text-blue-500 flex items-center gap-1 p-2 hover:text-blue-600"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <PlayCircle size={18} />}
            <span className="text-sm">Start</span>
          </button>
        )}
      </div>
    </div>
  );
}