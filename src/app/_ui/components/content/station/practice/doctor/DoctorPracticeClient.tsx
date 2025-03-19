'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Station } from "@/entities/models/station";
import { TimerControls } from './TimerControls';
import { NotesArea } from './NotesArea';
import { TimeWarning } from './TimeWarning';
import { TimeUpModal } from './TimeUpModal';
import { useToast } from "@/app/_ui/shadcn/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { Goal, FileText, User } from 'lucide-react';

interface DoctorPracticeClientProps {
  station: Station;
  stationId: string;
}

export function DoctorPracticeClient({ station, stationId }: DoctorPracticeClientProps) {
  const [notes, setNotes] = useState("");
  const [timeLeft, setTimeLeft] = useState(8 * 60); // 8 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);
  const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();
  
  // Timer effect
  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;
    
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    // Alert when 1 minute remains
    if (timeLeft === 60) {
      toast({
        title: "Time Alert",
        description: "1 minute remaining!",
        variant: "default",
      });
    }
    
    // Cleanup
    return () => clearInterval(timerId);
  }, [timeLeft, isPaused, toast]);
  
  // Handle end session
  const handleEndSession = () => {
    // Save notes to localStorage
    localStorage.setItem(`doctorNotes-${stationId}`, notes);
    router.push(`/station/${stationId}`);
  };
  
  // Load saved notes if any
  useEffect(() => {
    const savedNotes = localStorage.getItem(`doctorNotes-${stationId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [stationId]);
  
  // Handle save notes
  const handleSaveNotes = () => {
    localStorage.setItem(`doctorNotes-${stationId}`, notes);
    toast({
      title: "Notes saved",
      description: "Your notes have been saved",
    });
  };
  
  return (
    <div className="container mx-auto pb-4 px-4">
      {/* Timer and Controls */}
      <TimerControls 
        title={station.title}
        timeLeft={timeLeft}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        isEndDialogOpen={isEndDialogOpen}
        setIsEndDialogOpen={setIsEndDialogOpen}
        handleEndSession={handleEndSession}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Doctor Information Section - 3 columns */}
        <div className="md:col-span-3 space-y-6">
          
          
          {/* Situation */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 gap-2 pb-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>Situation Presentation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {station.doctorSheet.situationPresentation.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-2">{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Patient Information */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 gap-2 pb-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {station.doctorSheet.patientInformation.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-2">{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 gap-2 pb-2">
              <Goal className="h-5 w-5 text-primary" />
              <CardTitle>Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {station.doctorSheet.goals.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-2">{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Notes Section - 2 columns */}
        <div className="md:col-span-2">
          <NotesArea 
            notes={notes}
            setNotes={setNotes}
            handleSaveNotes={handleSaveNotes}
          />
        </div>
      </div>
      
      {/* Time warning that appears when time is almost up */}
      {timeLeft <= 60 && timeLeft > 0 && (
        <TimeWarning timeLeft={timeLeft} />
      )}
      
      {/* Time's up notification */}
      {timeLeft === 0 && (
        <TimeUpModal 
          setTimeLeft={setTimeLeft}
          handleEndSession={handleEndSession}
        />
      )}
    </div>
  );
}