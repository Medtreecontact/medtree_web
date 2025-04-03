'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Station } from "@/entities/models/station";
import { TimerControls } from './TimerControls';
import { NotesArea } from './NotesArea';
import { TimeWarning } from './TimeWarning';
import { TimeUpModal } from './TimeUpModal';
import { AnnexModal } from '@/app/_ui/components/content/station/chat/AnnexModal';
import { useToast } from "@/app/_ui/shadcn/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { Goal, FileText, User, ImageIcon, FileTextIcon, Maximize2 } from 'lucide-react';
import Image from 'next/image';

interface DoctorPracticeClientProps {
  station: Station;
  stationId: string;
}

export function DoctorPracticeClient({ station, stationId }: DoctorPracticeClientProps) {
  const [notes, setNotes] = useState("");
  const [timeLeft, setTimeLeft] = useState(8 * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
  
  const [annexModalState, setAnnexModalState] = useState({
    isOpen: false,
    type: null as 'text' | 'image' | null,
    content: '',
    path: '',
    title: '',
    index: 0
  });
  
  const router = useRouter();
  const { toast } = useToast();
  
  const openAnnexModal = (type: 'text' | 'image', index: number, content?: string, path?: string, title?: string) => {
    setAnnexModalState({
      isOpen: true,
      type,
      content: content || '',
      path: path || '',
      title: title || '',
      index
    });
  };
  
  const closeAnnexModal = () => {
    setAnnexModalState(prev => ({ ...prev, isOpen: false }));
  };
  
  const hasTextAnnexes = station.annexes.some(annex => annex.type === "text");
  
  const hasImageAnnexes = station.annexes.some(annex => annex.type === "image");
  
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
    
    if (timeLeft === 60) {
      toast({
        title: "Alerte de temps",
        description: "1 minute restante !",
        variant: "default",
      });
    }
    
    return () => clearInterval(timerId);
  }, [timeLeft, isPaused, toast]);
  
  const handleEndSession = () => {
    localStorage.setItem(`doctorNotes-${stationId}`, notes);
    router.push(`/station/${stationId}/practice/result`);
  };
  
  useEffect(() => {
    const savedNotes = localStorage.getItem(`doctorNotes-${stationId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [stationId]);
  
  const handleSaveNotes = () => {
    localStorage.setItem(`doctorNotes-${stationId}`, notes);
    toast({
      title: "Notes sauvegardées",
      description: "Vos notes ont été sauvegardées avec succès.",
    });
  };
  
  return (
    <div className="container mx-auto pb-4 px-4">
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
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 gap-2 pb-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>Présentation de la situation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {station.doctorSheet.situationPresentation.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-2">{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 gap-2 pb-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Informations patient</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {station.doctorSheet.patientInformation.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-2">{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 gap-2 pb-2">
              <Goal className="h-5 w-5 text-primary" />
              <CardTitle>Objectifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {station.doctorSheet.goals.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-2">{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {hasTextAnnexes && (
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 gap-2 pb-2">
                <FileTextIcon className="h-5 w-5 text-primary" />
                <CardTitle>Annexes Textuelles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {station.annexes
                    .filter(annex => annex.type === "text")
                    .map((annex, index) => (
                      <button 
                        key={index} 
                        onClick={() => openAnnexModal('text', index, annex.content)}
                        className="p-3 border border-gray-200 hover:border-primary/70 rounded w-full text-left flex items-start group transition-colors"
                      >
                        <div className="flex-1 text-sm line-clamp-2 whitespace-pre-line text-gray-700">
                          {annex.content}
                        </div>
                        <Maximize2 size={16} className="text-gray-400 group-hover:text-primary mt-0.5 flex-shrink-0" />
                      </button>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {hasImageAnnexes && (
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 gap-2 pb-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                <CardTitle>Annexes visuelles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {station.annexes
                    .filter(annex => annex.type === "image")
                    .map((annex, index) => (
                      <button 
                        key={index} 
                        onClick={() => openAnnexModal('image', index, undefined, annex.path, annex.title)}
                        className="border border-gray-200 hover:border-primary/70 rounded overflow-hidden group transition-colors"
                      >
                        <div className="relative h-24 flex items-center justify-center bg-gray-100 group-hover:bg-gray-50">
                          <Image
                            src={annex.path}
                            alt={annex.title || `Image ${index + 1}`}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="max-h-full max-w-full object-contain"
                            style={{ width: 'auto', height: 'auto' }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity">
                            <Maximize2 size={20} className="text-transparent group-hover:text-white" />
                          </div>
                        </div>
                        {annex.title && (
                          <div className="p-1 text-center text-xs font-medium text-gray-700 group-hover:text-primary truncate">
                            {annex.title}
                          </div>
                        )}
                      </button>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="md:col-span-2">
          <NotesArea 
            notes={notes}
            setNotes={setNotes}
            handleSaveNotes={handleSaveNotes}
          />
        </div>
      </div>
      
      {timeLeft <= 60 && timeLeft > 0 && (
        <TimeWarning timeLeft={timeLeft} />
      )}
      
      {timeLeft === 0 && (
        <TimeUpModal 
          setTimeLeft={setTimeLeft}
          handleEndSession={handleEndSession}
        />
      )}
      
      <AnnexModal 
        isOpen={annexModalState.isOpen}
        type={annexModalState.type}
        content={annexModalState.content}
        path={annexModalState.path}
        title={annexModalState.title}
        index={annexModalState.index}
        closeAnnexModal={closeAnnexModal}
      />
    </div>
  );
}