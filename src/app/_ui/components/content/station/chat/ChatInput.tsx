import React, { useRef, useEffect } from 'react';
import { DollarSign, Loader2, PlayCircle, Send } from 'lucide-react';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isChatStarted: boolean;
  startChat: () => void;
  shouldFocus?: boolean;
}

export function ChatInput({
  inputValue,
  setInputValue,
  handleSubmit,
  isLoading,
  isChatStarted,
  startChat,
  shouldFocus = true,
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (shouldFocus && isChatStarted && !isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatStarted, isLoading, shouldFocus]);
  
  return (
    <div className="bg-white border-t p-4">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2 mx-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isChatStarted ? "Écrivez votre message..." : "Lancez la consultation pour écrire un message..."}
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
            <span className="text-sm">Lancer</span>
          </button>
        )}
      </div>
    </div>
  );
}