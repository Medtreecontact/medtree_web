'use client';

import { Award, CheckCircle2, TrendingUp, Trophy, HeartHandshake } from "lucide-react";
import { cn } from "@/app/_ui/shadcn/lib/utils";
import { useEffect, useState } from "react";

interface ScoreDisplayProps {
  currentScore: number;
  totalPoints: number;
  percentage: number;
}

export function ScoreDisplay({ currentScore, totalPoints, percentage }: ScoreDisplayProps) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [percentage]);

  const getGradeInfo = (score: number) => {
    if (score >= 90) return { 
      letter: 'A', 
      color: 'text-green-600 border-green-200 bg-green-50', 
      description: 'Excellent',
      icon: Trophy
    };
    if (score >= 80) return { 
      letter: 'B', 
      color: 'text-emerald-600 border-emerald-200 bg-emerald-50', 
      description: 'Très bien',
      icon: HeartHandshake
    };
    if (score >= 70) return { 
      letter: 'C', 
      color: 'text-blue-600 border-blue-200 bg-blue-50', 
      description: 'Bien',
      icon: TrendingUp
    };
    if (score >= 60) return { 
      letter: 'D', 
      color: 'text-amber-600 border-amber-200 bg-amber-50', 
      description: 'Satisfaisant',
      icon: CheckCircle2
    };
    return { 
      letter: 'F', 
      color: 'text-red-600 border-red-200 bg-red-50', 
      description: 'Insuffisant',
      icon: CheckCircle2
    };
  };
  
  const grade = getGradeInfo(percentage);
  const GradeIcon = grade.icon;
  
  const getProgressColor = (percent: number) => {
    if (percent >= 90) return 'bg-green-500';
    if (percent >= 80) return 'bg-emerald-500';
    if (percent >= 70) return 'bg-blue-500';
    if (percent >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getFeedbackMessage = (percent: number) => {
    if (percent >= 90) return "Félicitations pour cette performance exceptionnelle !";
    if (percent >= 80) return "Très bonne maîtrise de la station !";
    if (percent >= 70) return "Bonne performance, continuez vos efforts !";
    if (percent >= 60) return "Performance satisfaisante, avec des points à améliorer.";
    return "Des révisions supplémentaires sont nécessaires.";
  };
  
  return (
    <div className="py-3 space-y-6">
      <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
        <div className={cn(
          "relative w-40 h-40 rounded-full flex items-center justify-center border-8 shadow-sm",
          grade.color
        )}>
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-1000 ease-out opacity-20",
                getProgressColor(percentage)
              )}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="text-center">
            <div className="text-7xl font-bold">
              {grade.letter}
            </div>
            <div className="text-sm font-medium mt-1">{percentage}%</div>
          </div>
        </div>
        
        <div className="space-y-3 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <div className="p-1.5 rounded-full bg-primary/10">
              <GradeIcon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">
              {grade.description}
            </h3>
          </div>
          
          <div className="text-3xl font-bold">
            {currentScore} <span className="text-muted-foreground">/ {totalPoints}</span>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="text-sm text-muted-foreground">
              {getFeedbackMessage(percentage)}
            </div>
            <div className="flex items-center gap-1 text-sm justify-center md:justify-start">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{currentScore} sur {totalPoints} points abordés</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-muted/20 p-4 rounded-lg space-y-2">
        <div className="flex justify-between items-center text-sm font-medium">
          <span>Pourcentage de réussite</span>
          <div className="flex items-center gap-1.5">
            <div className={cn(
              "w-3 h-3 rounded-full",
              getProgressColor(percentage)
            )}></div>
            <span className="font-bold">{percentage}%</span>
          </div>
        </div>
        <div className="relative h-2.5 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full transition-all duration-1000 ease-out",
              getProgressColor(percentage)
            )}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-border flex gap-2 justify-center items-center">
        <Award className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium">Session complétée le {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
}