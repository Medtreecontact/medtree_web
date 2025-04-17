'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChatInterface } from '@/app/_ui/components/content/station/chat/ChatInterface';
import { ArrowLeft, ClipboardCheck, Book } from 'lucide-react';
import { ChatTimer } from '@/app/_ui/components/content/station/chat/ChatTimer';
import { useState, useRef } from 'react';
import { Station } from '@/entities/models/station';
import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { EndConsultationDialog } from './EndConsultationDialog';
import { analyzeConsultation } from '@/app/actions/ai_actions';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/app/_ui/shadcn/components/ui/tooltip';

interface ChatPageProps {
  station: Station;
  stationId: string;
}

export function ChatPageClient({ station, stationId }: ChatPageProps) {
  const [timerActive, setTimerActive] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const manualPauseRef = useRef(false);
  const router = useRouter();
  
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  
  const updateTimerState = (isActive: boolean, isPaused: boolean) => {
    setTimerActive(isActive);
    if (!manualPauseRef.current) {
      setTimerPaused(isPaused);
    }
  };
  
  const handleTimerPauseToggle = (paused: boolean) => {
    setTimerPaused(paused);
    manualPauseRef.current = true;
    
    setTimeout(() => {
      manualPauseRef.current = false;
    }, 500);
  };
  
  const handleEndConsultation = () => {
    setTimerPaused(true);
    setIsEndDialogOpen(true);
  };
  
  const handleDialogClose = () => {
    setIsEndDialogOpen(false);
    if (timerActive) {
      setTimerPaused(false);
    }
  };
  
  const handleConfirmEnd = async () => {
    setIsAnalyzing(true);
    
    try {
      const analysisResult = await analyzeConsultation({
        messages: conversationHistory,
        stationId,
      });
      
      if (analysisResult.success) {
        router.push(`/station/${stationId}/chat/result/${analysisResult.resultId}`);
      } else {
        console.error('Analysis failed');
        setIsAnalyzing(false);
        setIsEndDialogOpen(false);
      }
    } catch (error) {
      console.error('Error during analysis:', error);
      setIsAnalyzing(false);
      setIsEndDialogOpen(false);
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-76.5955px)]">
      <div className="bg-white shadow-sm p-4 border-b flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/station/${stationId}`} className="mr-3 text-blue-500 p-1.5 rounded-full hover:bg-blue-50 transition-colors">
                <ArrowLeft size={18} />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Retour à la station</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">{station.title}</h1>
          <div className="flex items-center ml-3 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            <Book className="h-3 w-3 mr-1" />
            SDD {station.sddNumber}
          </div>
        </div>
        
        <div className="ml-auto flex items-center gap-3">
          <ChatTimer 
            isActive={timerActive} 
            isPaused={timerPaused}
            onPauseToggle={handleTimerPauseToggle}
          />
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
            onClick={handleEndConsultation}
            disabled={!timerActive || conversationHistory.length < 2} 
          >
            <ClipboardCheck className="h-4 w-4 text-blue-600" />
            Terminer la consultation
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ChatInterface 
          station={station} 
          onTimerStateChange={updateTimerState}
          onMessagesUpdate={setConversationHistory}
        />
      </div>
      
      <EndConsultationDialog 
        isOpen={isEndDialogOpen} 
        onClose={handleDialogClose}
        onConfirm={handleConfirmEnd}
        isAnalyzing={isAnalyzing}
      />
    </div>
  );
}