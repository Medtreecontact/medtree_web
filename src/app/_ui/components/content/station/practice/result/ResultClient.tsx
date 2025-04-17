'use client';

import { useState, useEffect } from 'react';
import { Station } from "@/entities/models/station";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { KeyPointsChecklist } from './KeyPointsChecklist';
import { ScoreDisplay } from './ScoreDisplay';
import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { useRouter } from 'next/navigation';
import { ArrowLeft, ClipboardCheck, BarChart, ArrowRight, ArrowLeftRight, ListChecks, Sparkles } from 'lucide-react';
import { updateStationAdvancement } from '@/app/actions/actions';
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/app/_ui/shadcn/components/ui/tabs";

interface ResultClientProps {
  station: Station;
  stationId: string;
}

interface CheckedState {
  keyPoints: Record<number, boolean>;
  subKeyPoints: Record<string, boolean>;
}

export function ResultClient({ station, stationId }: ResultClientProps) {
  const [checkedState, setCheckedState] = useState<CheckedState>({
    keyPoints: {},
    subKeyPoints: {}
  });
  const [mode, setMode] = useState<'checklist' | 'score'>('checklist');
  const [scoreData, setScoreData] = useState({
    currentScore: 0,
    totalPoints: 0,
    percentage: 0
  });
  const [isCalculating, setIsCalculating] = useState(false);
  
  const router = useRouter();
  
  const totalKeyPoints = station.gradingSheet.keyPoints.filter(
    point => !point.subKeyPoints || point.subKeyPoints.length === 0
  ).length;
  
  const totalSubKeyPoints = station.gradingSheet.keyPoints.reduce((total, point) => {
    return total + (point.subKeyPoints?.length || 0);
  }, 0);
  
  const totalPoints = totalKeyPoints + totalSubKeyPoints;

  const calculateScore = () => {
    const keyPointsChecked = Object.values(checkedState.keyPoints).filter(Boolean).length;
    const subKeyPointsChecked = Object.values(checkedState.subKeyPoints).filter(Boolean).length;
    
    const currentScore = keyPointsChecked + subKeyPointsChecked;
    const percentage = Math.round((currentScore / totalPoints) * 100);
    
    return {
      currentScore,
      totalPoints,
      percentage
    };
  };
  
  const handleKeyPointChange = (index: number, checked: boolean) => {
    setCheckedState(prev => ({
      ...prev,
      keyPoints: {
        ...prev.keyPoints,
        [index]: checked
      }
    }));
  };
  
  const handleSubKeyPointChange = (keyIndex: number, subIndex: number, checked: boolean) => {
    const key = `${keyIndex}-${subIndex}`;
    setCheckedState(prev => ({
      ...prev,
      subKeyPoints: {
        ...prev.subKeyPoints,
        [key]: checked
      }
    }));
  };
  
  const handleViewScore = async () => {
    setIsCalculating(true);
    const score = calculateScore();
    
    // Simulate calculation time for better UX
    setTimeout(async () => {
      setScoreData(score);
      setMode('score');
      setIsCalculating(false);
      
      await updateStationAdvancement(stationId, score.percentage, false);
    }, 600);
  };
  
  const handleBackToChecklist = () => {
    setMode('checklist');
  };
  
  const handleReturnToStation = () => {
    router.push(`/station/${stationId}`);
  };
  
  return (
    <div className="container mx-auto pb-12 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ClipboardCheck className="h-6 w-6 text-primary" />
          {station.title} - Évaluation
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
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 lg:order-2">
          <AnimatePresence mode="wait">
            {mode === 'checklist' ? (
              <motion.div 
                key="checklist"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-sm">
                  <CardHeader className="pb-4 border-b">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <ListChecks className="h-5 w-5 text-primary" />
                      Liste de vérification
                    </CardTitle>
                    <CardDescription>
                      Cochez tous les éléments qui ont été abordés pendant la session pour obtenir votre note
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <KeyPointsChecklist 
                      keyPoints={station.gradingSheet.keyPoints}
                      checkedState={checkedState}
                      onKeyPointChange={handleKeyPointChange}
                      onSubKeyPointChange={handleSubKeyPointChange}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end pt-6 border-t">
                    <Button 
                      onClick={handleViewScore}
                      className="flex items-center gap-2"
                      size="lg"
                      disabled={isCalculating}
                    >
                      {isCalculating ? (
                        <>
                          <span>Calcul en cours...</span>
                          <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        </>
                      ) : (
                        <>
                          <span>Voir votre note</span>
                          <Sparkles className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ) : (
              <motion.div 
                key="score"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-sm">
                  <CardHeader className="pb-4 border-b">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <BarChart className="h-5 w-5 text-primary" />
                      Votre résultat
                    </CardTitle>
                    <CardDescription>
                      Voici comment vous avez performé lors de cette session
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ScoreDisplay 
                      currentScore={scoreData.currentScore} 
                      totalPoints={scoreData.totalPoints} 
                      percentage={scoreData.percentage} 
                    />
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between pt-6 border-t">
                    <Button 
                      variant="outline"
                      onClick={handleBackToChecklist}
                      className="flex items-center gap-2 w-full sm:w-auto"
                    >
                      <ArrowLeftRight className="h-4 w-4" />
                      Retourner à la checklist
                    </Button>
                    <Button 
                      onClick={handleReturnToStation}
                      className="flex items-center gap-2 w-full sm:w-auto"
                    >
                      <ArrowRight className="h-4 w-4" />
                      Terminer l'évaluation
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="lg:col-span-4 lg:order-1">
          <Card className="shadow-sm sticky top-4">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Navigation</CardTitle>
              <CardDescription>
                Étapes de l'évaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <Tabs 
                defaultValue={mode} 
                value={mode}
                onValueChange={(value) => setMode(value as 'checklist' | 'score')}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="checklist" className="flex items-center gap-2">
                    <ListChecks className="h-4 w-4" />
                    Checklist
                  </TabsTrigger>
                  <TabsTrigger 
                    value="score" 
                    className="flex items-center gap-2"
                    disabled={mode === 'checklist'}
                  >
                    <BarChart className="h-4 w-4" />
                    Résultat
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">À propos de cette évaluation</h3>
                  <p className="text-sm text-muted-foreground">
                    Cette grille d'évaluation permet de mesurer votre performance 
                    selon les objectifs pédagogiques de la station.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Conseils</h3>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Cochez tous les points que vous avez abordés</li>
                    <li>Révisez les points manqués pour progresser</li>
                    <li>Répétez l'exercice pour améliorer vos performances</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}