'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Timer, Pause, Play } from 'lucide-react';

interface ChatTimerProps {
  initialTime?: number;
  isActive?: boolean;
  isPaused?: boolean;
  onPauseToggle?: (paused: boolean) => void;
}

export function ChatTimer({ 
  initialTime = 8 * 60,
  isActive = true,
  isPaused = false,
  onPauseToggle
}: ChatTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [internalPaused, setInternalPaused] = useState(!isActive || isPaused);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    setInternalPaused(!isActive || isPaused);
  }, [isActive, isPaused]);

  useEffect(() => {
    if (internalPaused || timeLeft <= 0) return;
    
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timerId);
  }, [timeLeft, internalPaused]);

  const togglePause = () => {
    const newPausedState = !internalPaused;
    setInternalPaused(newPausedState);
    if (onPauseToggle) {
      onPauseToggle(newPausedState);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-sm">
        <Timer className="h-4 w-4" />
        <span className="font-medium">{formatTime(timeLeft)}</span>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={togglePause}
        aria-label={internalPaused ? "Resume timer" : "Pause timer"}
        disabled={!isActive}
      >
        {internalPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
      </Button>
    </div>
  );
}