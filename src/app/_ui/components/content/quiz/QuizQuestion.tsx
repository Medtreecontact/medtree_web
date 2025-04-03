import { Alert, AlertDescription, AlertTitle } from "@/app/_ui/shadcn/components/ui/alert";
import { Checkbox } from "@/app/_ui/shadcn/components/ui/checkbox";
import { Label } from "@/app/_ui/shadcn/components/ui/label";
import { Question } from "@/entities/models/question";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function QuizQuestion({ 
  question, 
  selectedAnswers, 
  onSelectAnswers,
  showExplanation
}: { 
  question: Question; 
  selectedAnswers: string[];
  onSelectAnswers: (selectedAnswers: string[]) => void;
  showExplanation: boolean;
}) {
  const allAnswers = [...question.correctAnswers, ...question.wrongAnswers];
  
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
      <h2 className="text-xl font-semibold text-gray-800">{question.title}</h2>
      
      <div className="space-y-3">
        {allAnswers.map((answer, index) => (
          <div 
            key={index} 
            className={`flex items-start space-x-3 p-3 rounded-md border ${
              showExplanation && isCorrect(answer) 
                ? 'border-green-500 bg-green-50' 
                : showExplanation && selectedAnswers.includes(answer) && !isCorrect(answer)
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200'
            }`}
          >
            <Checkbox 
              id={`answer-${index}`}
              checked={selectedAnswers.includes(answer)}
              onCheckedChange={() => handleToggle(answer)}
              disabled={showExplanation}
            />
            <Label 
              htmlFor={`answer-${index}`}
              className="flex-1 cursor-pointer text-gray-700"
            >
              {answer}
            </Label>
            
            {showExplanation && isCorrect(answer) && (
              <CheckCircle2 size={18} className="text-green-500" />
            )}
            {showExplanation && !isCorrect(answer) && selectedAnswers.includes(answer) && (
              <AlertCircle size={18} className="text-red-500" />
            )}
          </div>
        ))}
      </div>
      
      {showExplanation && question.explanation && (
        <Alert className="mt-6 bg-blue-50 border-blue-200">
          <AlertTitle className="text-blue-800">Explanation</AlertTitle>
          <AlertDescription className="text-blue-700">
            {question.explanation}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}