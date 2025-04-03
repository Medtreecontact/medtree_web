'use client';

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/_ui/shadcn/components/ui/dialog";
import { Timer, Pause, Play, StopCircle } from 'lucide-react';

interface TimerControlsProps {
  title: string;
  timeLeft: number;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  isEndDialogOpen: boolean;
  setIsEndDialogOpen: (isOpen: boolean) => void;
  handleEndSession: () => void;
}

export function TimerControls({ 
  title, 
  timeLeft, 
  isPaused, 
  setIsPaused, 
  isEndDialogOpen, 
  setIsEndDialogOpen, 
  handleEndSession 
}: TimerControlsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title} - Rôle du docteur</h1>
      
      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-md ${timeLeft < 60 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
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
        
        <Dialog open={isEndDialogOpen} onOpenChange={setIsEndDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <StopCircle className="h-4 w-4 mr-2" />
              Mettre fin à la session
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mettre fin à la session</DialogTitle>
              <DialogDescription>
                Êtes vous sûr de vouloir mettre fin à cette session ? Vos notes seront sauvegardées.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEndDialogOpen(false)}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={handleEndSession}>
                Mettre fin à la session
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}