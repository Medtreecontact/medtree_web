'use client';

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Timer, Pause, Play } from 'lucide-react';

interface PatientTimerControlsProps {
  title: string;
  timeLeft: number;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
}

export function PatientTimerControls({ 
  title, 
  timeLeft, 
  isPaused, 
  setIsPaused
}: PatientTimerControlsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title} - Rôle du patient</h1>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-100 text-blue-700">
          <Timer className="h-5 w-5" />
          <span className="font-bold">{formatTime(timeLeft)}</span>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "Resume timer" : "Pause timer"}
        >
          {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
}