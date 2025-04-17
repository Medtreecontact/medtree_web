"use client";

import { Station } from "@/entities/models/station";
import { 
  ArrowLeft, Check, ClipboardCheck, UserRound, FileText, 
  BookOpen, ImageIcon, FileBoxIcon, List, FileTextIcon, Megaphone
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/_ui/shadcn/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { cn } from "@/app/_ui/shadcn/lib/utils";
import { Badge } from "@/app/_ui/shadcn/components/ui/badge";

export default function StationStudyTabs({ station }: { station: Station }) {
  const router = useRouter();
  
  const handleReturnToStation = () => {
    router.push(`/station/${station.id}`);
  };

  const hasTextAnnexes = station.annexes.some(annex => annex.type === "text");
  const hasImageAnnexes = station.annexes.some(annex => annex.type === "image");

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          {station.title} - Lecture Libre
        </h1>
        <Button 
          variant="outline" 
          onClick={handleReturnToStation}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à la station
        </Button>
      </div>
      
      <Tabs defaultValue="doctor" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted/70">
          <TabsTrigger value="doctor" className="flex items-center gap-2 py-3">
            <UserRound className="h-4 w-4" /> Fiche Médecin
          </TabsTrigger>
          <TabsTrigger value="patient" className="flex items-center gap-2 py-3">
            <UserRound className="h-4 w-4" /> Fiche Patient
          </TabsTrigger>
          <TabsTrigger 
            value="annexes" 
            className="flex items-center gap-2 py-3"
            disabled={station.annexes.length === 0}
          >
            <FileBoxIcon className="h-4 w-4" /> Annexes
          </TabsTrigger>
          <TabsTrigger value="grading" className="flex items-center gap-2 py-3">
            <ClipboardCheck className="h-4 w-4" /> Évaluation
          </TabsTrigger>
        </TabsList>
        
        {/* Doctor Tab Content */}
        <TabsContent value="doctor" className="mt-6 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center space-y-0 gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Présentation de la situation</CardTitle>
                <CardDescription>Contexte général de la consultation</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none space-y-2">
                {station.doctorSheet.situationPresentation.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-2">{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center space-y-0 gap-2">
              <UserRound className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Informations patient</CardTitle>
                <CardDescription>Détails sur le patient à recevoir</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none space-y-2">
                {station.doctorSheet.patientInformation.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-2">{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center space-y-0 gap-2">
              <List className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Objectifs</CardTitle>
                <CardDescription>Éléments à aborder durant la consultation</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none space-y-2">
                {station.doctorSheet.goals.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-2">{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Patient Tab Content */}
        <TabsContent value="patient" className="mt-6 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center space-y-0 gap-2">
              <UserRound className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Personnage Patient</CardTitle>
                <CardDescription>Description du rôle du patient</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none space-y-2">
                {station.patientSheet.patientPresentation.split("\n").map((paragraph, idx) => (
                  <p key={idx} className={idx === 0 ? "font-medium" : "mb-2"}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm bg-primary/5 border-primary/10">
            <CardHeader className="pb-3 flex flex-row items-center space-y-0 gap-2">
              <Megaphone className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Phrase de départ</CardTitle>
                <CardDescription>Première phrase du patient</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-background border border-primary/20 p-4 rounded-md">
                <p className="italic text-lg font-medium">"{station.patientSheet.startingSentence}"</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center space-y-0 gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Instructions patient</CardTitle>
                <CardDescription>Réponses à donner selon les questions</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(station.patientSheet.answers).map(([question, answer], index) => (
                <div 
                  key={index} 
                  className={cn(
                    "border rounded-lg overflow-hidden",
                    index % 2 === 0 ? "bg-muted/10" : "bg-card"
                  )}
                >
                  <div className="p-3 border-b bg-muted/30 flex items-center gap-2">
                    <UserRound className="h-4 w-4 text-primary" />
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
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Annexes Tab Content */}
        <TabsContent value="annexes" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileBoxIcon className="h-5 w-5 text-primary" />
                Documents annexes
              </CardTitle>
              <CardDescription>
                Documents complémentaires à consulter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {station.annexes.length > 0 ? (
                <>
                  {hasTextAnnexes && (
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                        <FileTextIcon className="h-5 w-5 text-primary" />
                        Annexes textuelles
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {station.annexes
                          .filter(annex => annex.type === "text")
                          .map((annex, index) => (
                            <div key={index} className="p-4 border rounded-md bg-muted/10 hover:bg-muted/20 transition-colors">
                              <div className="whitespace-pre-line">{annex.content}</div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {hasImageAnnexes && (
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                        <ImageIcon className="h-5 w-5 text-primary" />
                        Annexes visuelles
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {station.annexes
                          .filter(annex => annex.type === "image")
                          .map((annex, index) => (
                            <div key={index} className="border rounded-md overflow-hidden shadow-sm bg-background hover:shadow-md transition-shadow">
                              <div className="relative h-48 flex items-center justify-center bg-muted/20">
                                <Image 
                                  src={annex.path} 
                                  alt={annex.title || `Image annexe ${index + 1}`}
                                  width={0}
                                  height={0}
                                  sizes="100vw"
                                  className="max-h-full max-w-full object-contain"
                                  style={{ width: 'auto', height: 'auto' }}
                                />
                              </div>
                              {annex.title && (
                                <div className="p-3 text-center font-medium text-sm border-t">
                                  {annex.title}
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                  <FileBoxIcon className="h-12 w-12 mb-3 text-muted" />
                  <p>Aucune annexe disponible pour cette station</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Grading Tab Content */}
        <TabsContent value="grading" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Points clés de la station
              </CardTitle>
              <CardDescription>
                Éléments à évaluer lors de la consultation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {station.gradingSheet.keyPoints.map((point, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "border rounded-lg overflow-hidden shadow-sm",
                    index % 2 === 0 ? "bg-muted/5" : "bg-background"
                  )}
                >
                  <div className="p-4 flex items-start gap-3">
                    <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{point.keyPoint}</p>
                      
                      {point.subKeyPoints && point.subKeyPoints.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-muted space-y-2">
                          {point.subKeyPoints.map((subPoint, subIndex) => (
                            <div key={subIndex} className="flex items-center gap-2">
                              <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                <Check className="h-3 w-3" />
                              </div>
                              <span className="text-sm text-muted-foreground">{subPoint}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Badge variant="outline" className="ml-auto mt-1">
                      {point.subKeyPoints?.length ? `${point.subKeyPoints.length } pts` : "1 pt"}
                    </Badge>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center justify-end gap-2 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary/80"></div>
                  <span className="text-sm text-muted-foreground">
                    Total: {station.gradingSheet.keyPoints.reduce((total, point) => total + (point.subKeyPoints?.length || 1), 0)} points
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}