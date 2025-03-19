'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Station } from "@/entities/models/station";
import { PatientTimerControls } from './PatientTimerControls';
import { NotesArea } from './NotesArea';
import { TimeUpModal } from './TimeUpModal';
import { useToast } from "@/app/_ui/shadcn/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { MessageSquare, User, Info } from 'lucide-react';
import { Separator } from "@/app/_ui/shadcn/components/ui/separator";

interface PatientPracticeClientProps {
  station: Station;
  stationId: string;
}

export function PatientPracticeClient({ station, stationId }: PatientPracticeClientProps) {
  const [notes, setNotes] = useState("");
  const [timeLeft, setTimeLeft] = useState(8 * 60); // 8 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);
  
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
    
    // Cleanup
    return () => clearInterval(timerId);
  }, [timeLeft, isPaused]);
  
  // Handle end session (used only in TimeUpModal)
  const handleEndSession = () => {
    // Save notes to localStorage
    localStorage.setItem(`patientNotes-${stationId}`, notes);
    router.push(`/station/${stationId}`);
  };
  
  // Load saved notes if any
  useEffect(() => {
    const savedNotes = localStorage.getItem(`patientNotes-${stationId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [stationId]);
  
  // Handle save notes
  const handleSaveNotes = () => {
    localStorage.setItem(`patientNotes-${stationId}`, notes);
    toast({
      title: "Notes saved",
      description: "Your notes have been saved",
    });
  };
  
  // Organize patient answers for display
  const patientAnswers = Object.entries(station.patientSheet.answers);
  
  return (
    <div className="container mx-auto pb-4 px-4">
      {/* Timer and Controls */}
      <PatientTimerControls 
        title={station.title}
        timeLeft={timeLeft}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Patient Information Section - 3 columns */}
        <div className="md:col-span-3 space-y-6">
          {/* Patient Presentation */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 gap-2 pb-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Your Character</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {station.patientSheet.patientPresentation.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-2">{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Starting Sentence */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 gap-2 pb-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <CardTitle>Starting Sentence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/10 p-4 rounded-md italic">
                "{station.patientSheet.startingSentence}"
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Begin with this line when the doctor asks why you're here today.
              </p>
            </CardContent>
          </Card>
          
          {/* Answers to possible questions */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 gap-2 pb-2">
              <Info className="h-5 w-5 text-primary" />
              <CardTitle>Your Answers to Questions</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
              <p className="text-sm text-muted-foreground mb-4">
                Here are your prepared responses to questions the doctor might ask:
              </p>
              
              <div className="space-y-4">
                {patientAnswers.map(([question, answer], idx) => (
                  <div key={idx} className="pb-3 border-b border-gray-100 last:border-b-0">
                    <h3 className="font-medium text-primary mb-1">{question}</h3>
                    <div className="text-sm pl-1">
                      {answer.split("\n").map((paragraph, pIdx) => (
                        <p key={pIdx} className="mb-2 last:mb-0">{paragraph}</p>
                      ))}
                    </div>
                  </div>
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