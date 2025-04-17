'use client';

import { useState, useEffect } from 'react';
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

  const getTimerClasses = () => {
    if (!isActive) return "bg-gray-100 text-gray-500";
    if (timeLeft < 60) return "bg-red-100 text-red-700 animate-pulse";
    if (timeLeft < 120) return "bg-amber-100 text-amber-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium shadow-sm transition-colors ${getTimerClasses()}`}>
        <Timer className="h-4 w-4" />
        <span>{formatTime(timeLeft)}</span>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
        onClick={togglePause}
        aria-label={internalPaused ? "Reprendre le chronomètre" : "Mettre en pause"}
        disabled={!isActive}
      >
        {internalPaused ? 
          <Play className="h-4 w-4 text-blue-600" /> : 
          <Pause className="h-4 w-4 text-blue-600" />
        }
      </Button>
    </div>
  );
}