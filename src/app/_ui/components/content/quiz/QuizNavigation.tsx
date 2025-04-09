import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Flag } from "lucide-react";
import { Separator } from "@/app/_ui/shadcn/components/ui/separator";

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
    <div className="mt-8">
      <Separator className="mb-6" />
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className="px-4 border-gray-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
        </Button>
        
        <div>
          {!showExplanation ? (
            <Button 
              onClick={onCheck}
              disabled={!hasSelectedAnswers}
              variant="default"
              className="px-5"
            >
              <CheckCircle className="mr-2 h-4 w-4" /> Vérifier
            </Button>
          ) : (
            <Button 
              onClick={onNext}
              variant="default"
              className="px-5"
            >
              {isLastQuestion ? (
                <>
                  <Flag className="mr-2 h-4 w-4" /> Finir le Quiz
                </>
              ) : (
                <>
                  Prochaine Question <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}