import { MessageCircle, User, Loader2 } from 'lucide-react';
import { ScrollArea } from "@/app/_ui/shadcn/components/ui/scroll-area";
import { Badge } from '@/app/_ui/shadcn/components/ui/badge';
import { useState } from 'react';
import { motion } from "framer-motion";

export function TranscriptView({ 
  chatHistory 
}: { 
  chatHistory: Array<{ role: string; text: string; }> 
}) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredHistory = searchTerm ? 
    chatHistory.filter(message => 
      message.text.toLowerCase().includes(searchTerm.toLowerCase())
    ) : 
    chatHistory;
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setIsSearching(true);
    setSearchTerm(term);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      setIsSearching(false);
    }, 300);
  };
  
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-50 p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-primary" />
          <h3 className="font-medium">Historique de la consultation</h3>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher dans la conversation..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="text-sm px-3 py-1 border border-gray-200 rounded-md w-60 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {isSearching && (
            <div className="absolute right-2 top-1.5">
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            </div>
          )}
        </div>
      </div>
      
      <ScrollArea className="h-[500px] p-4">
        <div className="space-y-5">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((message, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`p-3 rounded-lg ${
                  message.role === 'user' 
                  ? 'bg-blue-50 border-l-4 border-blue-400' 
                  : 'bg-gray-50 border-l-4 border-gray-400'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    message.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'
                  }`}>
                    <User className="h-3.5 w-3.5" />
                  </div>
                  
                  <p className="text-xs font-medium flex-1">
                    {message.role === 'user' ? 'Vous (Docteur)' : 'Patient'}
                  </p>
                  
                  <Badge variant={message.role === 'user' ? 'default' : 'secondary'} className="text-xs">
                    Message {idx + 1}
                  </Badge>
                </div>
                
                <div className="pl-8">
                  <p className="text-sm whitespace-pre-line leading-relaxed">
                    {highlightSearchTerm(message.text, searchTerm)}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-center text-gray-500">
              <MessageCircle className="h-8 w-8 mb-2 opacity-30" />
              <p>Aucun message ne correspond à votre recherche</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function highlightSearchTerm(text: string, searchTerm: string) {
  if (!searchTerm) return text;
  
  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  
  return parts.map((part, index) => 
    part.toLowerCase() === searchTerm.toLowerCase() ? 
      <mark key={index} className="bg-yellow-200 px-0.5 rounded">{part}</mark> : 
      part
  );
}
