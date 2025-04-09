import { Badge } from "@/app/_ui/shadcn/components/ui/badge";
import { Progress } from "@/app/_ui/shadcn/components/ui/progress";
import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Clock, Pause, Play, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/app/_ui/shadcn/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/_ui/shadcn/components/ui/tooltip";

export default function QuizHeader({ 
  title, 
  description, 
  difficulty, 
  duration 
}: { 
  title: string; 
  description: string; 
  difficulty: string; 
  duration: number;
}) {
  // Convert duration from minutes to seconds
  const totalSeconds = duration * 60;
  
  // State for timer
  const [timeRemaining, setTimeRemaining] = useState(totalSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Timer effect
  useEffect(() => {
    if (!isTimerRunning || timeRemaining <= 0) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        setProgress(100 - ((newTime / totalSeconds) * 100));
        
        if (newTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isTimerRunning, totalSeconds]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Timer controls
  const toggleTimer = () => setIsTimerRunning(prev => !prev);
  const resetTimer = () => setTimeRemaining(totalSeconds);
  
  // Function to determine badge styling based on difficulty
  const getDifficultyStyles = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200';
      case 'medium': return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
      case 'hard': return 'bg-rose-100 text-rose-700 hover:bg-rose-200';
      default: return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
    }
  };
  
  // Function to determine progress color based on time elapsed
  const getProgressColor = () => {
    if (progress < 33) return "bg-emerald-500";
    if (progress < 66) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <Card className="border border-gray-200">
      <CardContent className="pt-6">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        
        <div className="flex flex-wrap items-center mt-3 gap-3">
          <Badge className={`${getDifficultyStyles(difficulty)} px-2 py-0.5`}>
            {difficulty}
          </Badge>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={14} className="mr-1.5" />
            <span>{duration} minutes</span>
          </div>
        </div>
        
        <p className="mt-4 text-gray-600">{description}</p>
        
        {/* Timer and Progress Bar */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium flex itemscenter gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className={`${timeRemaining < 60 ? 'text-rose-600 font-semibold' : 'text-gray-700'} transition-colors`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={toggleTimer}
                      className="h-8 w-8 p-0 border-gray-300"
                    >
                      {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isTimerRunning ? 'Pause Timer' : 'Resume Timer'}</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={resetTimer}
                      className="h-8 w-8 p-0 border-gray-300"
                      disabled={timeRemaining === totalSeconds}
                    >
                      <RefreshCw size={14} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset Timer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <Progress 
            value={progress}
            className={`h-2 transition-all duration-1000 ${getProgressColor()}`}
          />
        </div>
      </CardContent>
    </Card>
  );
}