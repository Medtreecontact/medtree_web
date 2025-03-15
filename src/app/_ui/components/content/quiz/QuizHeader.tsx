import { Badge } from "@/app/_ui/shadcn/components/ui/badge";
import { Progress } from "@/app/_ui/shadcn/components/ui/progress";
import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Clock, Pause, Play, RotateCw } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [progress, setProgress] = useState(0); // Percentage completed (starts at 0)
  
  // Timer effect
  useEffect(() => {
    if (!isTimerRunning || timeRemaining <= 0) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        // Update progress percentage (inverted to fill from left to right)
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
  
  // Function to determine badge color based on difficulty
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };
  
  // Function to determine progress color based on time elapsed
  const getProgressColor = () => {
    if (progress < 33) return "bg-green-500";
    if (progress < 66) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      
      <div className="flex items-center mt-2 space-x-4">
        <Badge className={`${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </Badge>
        
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={16} className="mr-1" />
          <span>{duration} minutes</span>
        </div>
      </div>
      
      <p className="mt-4 text-gray-600">{description}</p>
      
      {/* Timer and Progress Bar */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium text-gray-700">
            Time Remaining: {formatTime(timeRemaining)}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleTimer}
              className="h-8 w-8 p-0"
            >
              {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
            </Button>
          </div>
        </div>
        
        <Progress 
          value={progress}
          className={`h-2 transition-all duration-1000 ${getProgressColor()}`}
        />
      </div>
    </div>
  );
}