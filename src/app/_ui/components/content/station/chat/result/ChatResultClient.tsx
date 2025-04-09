'use client';

import { useState } from 'react';
import { Station } from '@/entities/models/station';
import { AiEcosDiscussion } from '@/entities/models/ai_ecos_discussion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/_ui/shadcn/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_ui/shadcn/components/ui/tabs';
import { Button } from '@/app/_ui/shadcn/components/ui/button';
import { CheckCircle2, MessageSquare, ArrowLeft, FileText, BarChart3 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ScoreCard } from './ScoreCard';
import { TranscriptView } from './TranscriptView';
import { KeyPointsEvaluation } from './KeyPointsEvaluation';
import { motion } from 'framer-motion';

interface ChatResultClientProps {
  station: Station;
  stationId: string;
  analysisResult: AiEcosDiscussion;
}

export function ChatResultClient({ station, stationId, analysisResult }: ChatResultClientProps) {
  const [activeTab, setActiveTab] = useState('evaluation');
  const router = useRouter();

  const handleReturnToStation = () => {
    router.push(`/station/${stationId}`);
  };
  
  const isKeyPointAddressed = (keyPoint: string): boolean => {
    return analysisResult.evaluation.includes(keyPoint);
  };
  
  const addressedCount = analysisResult.evaluation.length;
  
  const totalKeyPoints = station.gradingSheet.keyPoints.reduce((total, point) => {
    return total + (point.subKeyPoints ? point.subKeyPoints.length : 1);
  }, 0);

  const getFeedbackSummary = () => {
    const percentage = Math.round((addressedCount / totalKeyPoints) * 100);
    
    if (percentage >= 80) {
      return "Excellente consultation ! Vous avez abordé la grande majorité des points importants.";
    } else if (percentage >= 60) {
      return "Bonne consultation, mais certains points importants ont été omis.";
    } else {
      return "Plusieurs points importants n'ont pas été abordés durant cette consultation.";
    }
  };
  
  return (
    <motion.div 
      className="container mx-auto pb-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-4 mb-6 rounded-lg shadow-sm border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary">{station.title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">Résultat de votre consultation du {new Date(analysisResult.date).toLocaleDateString('fr-FR')}</p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleReturnToStation}
          className="flex items-center gap-2 border-primary/20 hover:bg-primary/5 self-start sm:self-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à la station
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <ScoreCard 
            score={analysisResult.score}
            addressedCount={addressedCount}
            totalKeyPoints={totalKeyPoints}
            date={new Date(analysisResult.date)}
          />
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Résumé
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm">
                <p className="text-gray-700">{getFeedbackSummary()}</p>
                <p className="text-gray-700 mt-3">
                  Cette évaluation est basée sur le nombre de points clés que vous avez abordés pendant votre conversation avec le patient.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Analyse détaillée
              </CardTitle>
              <CardDescription>
                Consultez les points clés et l'historique de votre consultation
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="evaluation" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid grid-cols-2 mb-6 p-1">
                  <TabsTrigger value="evaluation" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                    <CheckCircle2 className="h-4 w-4" />
                    Évaluation
                  </TabsTrigger>
                  <TabsTrigger value="transcript" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                    <MessageSquare className="h-4 w-4" />
                    Conversation
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="evaluation" className="space-y-6 mt-0 focus-visible:outline-none focus-visible:ring-0">
                  <KeyPointsEvaluation 
                    keyPoints={station.gradingSheet.keyPoints}
                    isKeyPointAddressed={isKeyPointAddressed}
                  />
                </TabsContent>
                
                <TabsContent value="transcript" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  <TranscriptView chatHistory={analysisResult.chatHistory} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}