'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChatInterface } from '@/app/_ui/components/content/station/chat/ChatInterface';
import { ArrowLeft, ClipboardCheck } from 'lucide-react';
import { ChatTimer } from '@/app/_ui/components/content/station/chat/ChatTimer';
import { useState, useRef } from 'react';
import { Station } from '@/entities/models/station';
import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { EndConsultationDialog } from './EndConsultationDialog';
import { analyzeConsultation } from '@/app/actions/ai_actions';

interface ChatPageProps {
  station: Station;
  stationId: string;
}

export function ChatPageClient({ station, stationId }: ChatPageProps) {
  const [timerActive, setTimerActive] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
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
    try {
      const analysisResult = await analyzeConsultation({
        messages: conversationHistory,
        stationId,
      });
      
      if (analysisResult.success) {
        router.push(`/station/${stationId}/chat/result/${analysisResult.resultId}`);
      } else {
        console.error('Analysis failed');
        setIsEndDialogOpen(false);
      }
    } catch (error) {
      console.error('Error during analysis:', error);
      setIsEndDialogOpen(false);
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-76.5955px)]">
      <div className="bg-white shadow-sm p-4 flex items-center">
        <Link href={`/station/${stationId}`} className="mr-3 text-blue-500">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-semibold">{station.title}</h1>
        <span className="ml-2 text-sm text-gray-500">Simulation de consultation</span>
        
        <div className="ml-auto flex items-center gap-3">
          <ChatTimer 
            isActive={timerActive} 
            isPaused={timerPaused}
            onPauseToggle={handleTimerPauseToggle}
          />
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            onClick={handleEndConsultation}
            disabled={!timerActive || conversationHistory.length < 2} 
          >
            <ClipboardCheck className="h-4 w-4" />
            Mettre fin à la session
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
      />
    </div>
  );
}