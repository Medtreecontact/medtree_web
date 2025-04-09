import { Alert, AlertDescription, AlertTitle } from "@/app/_ui/shadcn/components/ui/alert";
import { Checkbox } from "@/app/_ui/shadcn/components/ui/checkbox";
import { Label } from "@/app/_ui/shadcn/components/ui/label";
import { Question } from "@/entities/models/question";
import { AlertCircle, CheckCircle2, InfoIcon, LightbulbIcon } from "lucide-react";
import { Separator } from "@/app/_ui/shadcn/components/ui/separator";

export default function QuizQuestion({ 
  question, 
  selectedAnswers, 
  onSelectAnswers,
  showExplanation,
  hideTitle = false
}: { 
  question: Question; 
  selectedAnswers: string[];
  onSelectAnswers: (selectedAnswers: string[]) => void;
  showExplanation: boolean;
  hideTitle?: boolean;
}) {
  const allAnswers = [...question.correctAnswers, ...question.wrongAnswers].sort();
  
  const handleToggle = (answer: string) => {
    if (showExplanation) return; // Prevent changing answers after checking
    
    if (selectedAnswers.includes(answer)) {
      onSelectAnswers(selectedAnswers.filter(a => a !== answer));
    } else {
      onSelectAnswers([...selectedAnswers, answer]);
    }
  };
  
  const isCorrect = (answer: string) => question.correctAnswers.includes(answer);
  
  return (
    <div className="space-y-6">
      {!hideTitle && (
        <div>
          <h2 className="text-xl font-medium text-gray-800 leading-relaxed mb-1">{question.title}</h2>
          <Separator className="my-4" />
        </div>
      )}
      
      <div className="space-y-3">
        {allAnswers.map((answer, index) => {
          const isSelected = selectedAnswers.includes(answer);
          const showCorrectAnswer = showExplanation && isCorrect(answer);
          const showIncorrectSelection = showExplanation && isSelected && !isCorrect(answer);
          
          return (
            <div 
              key={index} 
              className={`flex items-start rounded-md transition-all duration-200 ${
                showExplanation ? 'pl-3' : 'hover:bg-gray-50 cursor-pointer'
              } ${
                showCorrectAnswer 
                  ? 'border-l-4 border-green-500 bg-green-50' 
                  : showIncorrectSelection
                  ? 'border-l-4 border-red-500 bg-red-50'
                  : 'border-l-4 border-transparent'
              }`}
              onClick={() => !showExplanation && handleToggle(answer)}
            >
              <div className="p-3 flex items-start space-x-3 w-full">
                <Checkbox 
                  id={`answer-${index}`}
                  checked={isSelected}
                  onCheckedChange={() => handleToggle(answer)}
                  disabled={showExplanation}
                  className={`mt-0.5 ${
                    showCorrectAnswer ? 'border-green-500 text-green-500' : 
                    showIncorrectSelection ? 'border-red-500 text-red-500' : ''
                  }`}
                />
                <Label 
                  htmlFor={`answer-${index}`}
                  className="flex-1 text-base text-gray-700 leading-relaxed"
                >
                  {answer}
                </Label>
                
                {showExplanation && isCorrect(answer) && (
                  <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                )}
                {showExplanation && !isCorrect(answer) && isSelected && (
                  <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {showExplanation && question.explanation && (
        <Alert className="mt-6 bg-blue-50 border-blue-200">
          <LightbulbIcon className="h-4 w-4 text-blue-700" />
          <AlertTitle className="text-blue-800 font-medium">Explanation</AlertTitle>
          <AlertDescription className="text-blue-700 mt-2">
            {question.explanation}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}