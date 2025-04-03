'use client';

import { Progress } from "@/app/_ui/shadcn/components/ui/progress";
import { Award, CheckCircle2 } from "lucide-react";

interface ScoreDisplayProps {
  currentScore: number;
  totalPoints: number;
  percentage: number;
}

export function ScoreDisplay({ currentScore, totalPoints, percentage }: ScoreDisplayProps) {
  const getGradeInfo = (score: number) => {
    if (score >= 90) return { letter: 'A', color: 'text-green-600', description: 'Excellent' };
    if (score >= 80) return { letter: 'B', color: 'text-emerald-600', description: 'Très bien' };
    if (score >= 70) return { letter: 'C', color: 'text-blue-600', description: 'Bien' };
    if (score >= 60) return { letter: 'D', color: 'text-amber-600', description: 'Satisfaisant' };
    return { letter: 'F', color: 'text-red-600', description: 'Insuffisant' };
  };
  
  const grade = getGradeInfo(percentage);
  
  const getProgressColor = (percent: number) => {
    if (percent >= 90) return 'bg-green-500';
    if (percent >= 80) return 'bg-emerald-500';
    if (percent >= 70) return 'bg-blue-500';
    if (percent >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="py-3 space-y-4">
      <div className="flex items-center gap-6 justify-center">
        <div className="relative w-32 h-32 rounded-full flex items-center justify-center bg-muted/20 border-6 border-muted">
          <div className={`text-5xl font-bold ${grade.color}`}>
            {grade.letter}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-3xl font-bold">
            {currentScore} / {totalPoints}
          </div>
          <div className="text-lg text-muted-foreground">
            {grade.description}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <CheckCircle2 className="h-4 w-4" />
            <span>{currentScore} sur {totalPoints} points abordés</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span>Pourcentage de réussite</span>
          <span className="font-bold">{percentage}%</span>
        </div>
        <Progress 
          value={percentage} 
          className="h-2"
          style={{ 
            ["--progress-background" as any]: getProgressColor(percentage) 
          }}
        />
      </div>
      
      <div className="pt-2 border-t border-border flex gap-2 justify-center items-center">
        <Award className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium">Session complétée le {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
}