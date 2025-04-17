'use client';

import { useEffect, useState } from 'react';
import { Station } from "@/entities/models/station";
import { NotesArea } from './NotesArea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { 
  MessageSquare, User, Info, Clock, BookOpen, 
  Megaphone, ScrollText, MessageCircle
} from 'lucide-react';
import { Badge } from "@/app/_ui/shadcn/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_ui/shadcn/components/ui/tabs";
import { cn } from "@/app/_ui/shadcn/lib/utils";

interface PatientPracticeClientProps {
  station: Station;
  stationId: string;
}

export function PatientPracticeClient({ station, stationId }: PatientPracticeClientProps) {
  const [notes, setNotes] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const patientAnswers = Object.entries(station.patientSheet.answers);
  
  // Load saved notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`patientNotes-${stationId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
    
    // Start timer
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [stationId]);
  
  // Auto-save notes every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (notes) {
        localStorage.setItem(`patientNotes-${stationId}`, notes);
      }
    }, 30000);
    
    return () => clearInterval(autoSaveInterval);
  }, [notes, stationId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="container mx-auto pb-12 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          {station.title} - Rôle du patient
        </h1>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Durée: {formatTime(elapsedTime)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Profil patient
              </TabsTrigger>
              <TabsTrigger value="responses" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Réponses
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-4 space-y-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-3 flex flex-row items-center space-y-0 gap-2">
                  <User className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <CardTitle>Votre Personnage</CardTitle>
                    <CardDescription>Découvrez qui vous êtes dans ce scénario</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none space-y-2">
                    {station.patientSheet.patientPresentation.split("\n").map((paragraph, idx) => (
                      <p key={idx} className={idx === 0 ? "font-medium" : ""}>{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm bg-primary/5 border-primary/10">
                <CardHeader className="pb-3 flex flex-row items-center space-y-0 gap-2">
                  <Megaphone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <CardTitle>Phrase de départ</CardTitle>
                    <CardDescription>Commencez l'échange avec cette phrase</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-card border border-primary/20 p-4 rounded-md">
                    <p className="italic text-lg font-medium">"{station.patientSheet.startingSentence}"</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="responses" className="mt-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-3 flex flex-row items-center space-y-0 gap-2">
                  <ScrollText className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <CardTitle>Réponses préparées</CardTitle>
                    <CardDescription>Vos réponses aux questions du médecin</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {patientAnswers.map(([question, answer], idx) => (
                      <div 
                        key={idx} 
                        className={cn(
                          "border rounded-lg overflow-hidden",
                          idx % 2 === 0 ? "bg-muted/10" : "bg-card"
                        )}
                      >
                        <div className="p-3 border-b bg-muted/30 flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-primary" />
                          <h3 className="font-medium text-sm">{question}</h3>
                        </div>
                        
                        <div className="p-4">
                          <div className="space-y-2 text-sm">
                            {answer.split("\n").map((paragraph, pIdx) => (
                              <p key={pIdx} className="leading-relaxed">{paragraph}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:col-span-2">
          <NotesArea 
            notes={notes}
            setNotes={setNotes}
            stationId={stationId}
          />
        </div>
      </div>
    </div>
  );
}