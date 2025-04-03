'use client';

import { useState } from 'react';
import { Station } from "@/entities/models/station";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { KeyPointsChecklist } from './KeyPointsChecklist';
import { ScoreDisplay } from './ScoreDisplay';
import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { useRouter } from 'next/navigation';
import { ArrowLeft, ClipboardCheck, BarChart, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { updateStationAdvancement } from '@/app/actions/actions';

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
  const [showScore, setShowScore] = useState(false);
  const [scoreData, setScoreData] = useState({
    currentScore: 0,
    totalPoints: 0,
    percentage: 0
  });
  
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
    const score = calculateScore();
    setScoreData(score);
    setShowScore(true);
    
    await updateStationAdvancement(stationId, score.percentage, false);
  };
  
  const handleBackToChecklist = () => {
    setShowScore(false);
  };
  
  const handleReturnToStation = () => {
    router.push(`/station/${stationId}`);
  };
  
  return (
    <div className="container mx-auto pb-4 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{station.title} - Évaluation</h1>
        <Button 
          variant="outline" 
          onClick={handleReturnToStation}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à la station
        </Button>
      </div>
      
      {!showScore ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              Évaluation de la session
            </CardTitle>
            <CardDescription>
              Cochez tous les éléments qui ont été abordés pendant la session
            </CardDescription>
          </CardHeader>
          <CardContent>
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
            >
              <span>Voir votre note</span>
              <BarChart className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Votre note
              </CardTitle>
              <CardDescription>
                Voici comment vous avez performé lors de cette session
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-full max-w-md">
                <ScoreDisplay 
                  currentScore={scoreData.currentScore} 
                  totalPoints={scoreData.totalPoints} 
                  percentage={scoreData.percentage} 
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-6 border-t">
              <Button 
                variant="outline"
                onClick={handleBackToChecklist}
                className="flex items-center gap-2"
              >
                <ArrowLeftRight className="h-4 w-4" />
                Retourner à la checklist
              </Button>
              <Button 
                onClick={handleReturnToStation}
                className="flex items-center gap-2"
              >
                <ArrowRight className="h-4 w-4" />
                Quitter l'évaluation
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}