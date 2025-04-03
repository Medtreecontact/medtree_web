import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export default function QuizNavigation({
  currentIndex,
  totalQuestions,
  onNext,
  onPrevious,
  onCheck,
  showExplanation,
  hasSelectedAnswers
}: {
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  onCheck: () => void;
  showExplanation: boolean;
  hasSelectedAnswers: boolean;
}) {
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  
  return (
    <div className="mt-8 flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstQuestion}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Previous
      </Button>
      
      {!showExplanation ? (
        <Button 
          onClick={onCheck}
          disabled={!hasSelectedAnswers}
          variant="default"
        >
          <Check className="mr-2 h-4 w-4" /> Check Answer
        </Button>
      ) : (
        <Button 
          onClick={onNext}
          variant="default"
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}