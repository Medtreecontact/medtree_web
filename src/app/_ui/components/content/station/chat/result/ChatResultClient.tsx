'use client';

import { useState } from 'react';
import { Station } from '@/entities/models/station';
import { AiEcosDiscussion } from '@/entities/models/ai_ecos_discussion';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_ui/shadcn/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_ui/shadcn/components/ui/tabs';
import { Button } from '@/app/_ui/shadcn/components/ui/button';
import { Award, BarChart, CheckCircle2, MessageSquare, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ScoreCard } from './ScoreCard';
import { TranscriptView } from './TranscriptView';
import { KeyPointsEvaluation } from './KeyPointsEvaluation';

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
    
    return (
      <div className="container mx-auto pb-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{station.title} - Résultat de la session</h1>
          <Button 
            variant="outline" 
            onClick={handleReturnToStation}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la station
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ScoreCard 
              score={analysisResult.score}
              addressedCount={addressedCount}
              totalKeyPoints={totalKeyPoints}
              date={new Date(analysisResult.date)}
            />
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Analyse de la consultation</CardTitle>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="evaluation" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="evaluation" className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Évaluation
                    </TabsTrigger>
                    <TabsTrigger value="transcript" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Historiques de discussion
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="evaluation" className="space-y-6">
                    <KeyPointsEvaluation 
                      keyPoints={station.gradingSheet.keyPoints}
                      isKeyPointAddressed={isKeyPointAddressed}
                    />
                  </TabsContent>
                  
                  <TabsContent value="transcript">
                    <TranscriptView chatHistory={analysisResult.chatHistory} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }