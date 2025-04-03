import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Progress } from "@/app/_ui/shadcn/components/ui/progress";
import { Exam } from "@/entities/models/exam";
import { Quiz } from "@/entities/models/quiz";
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QuizSummary({
  exam,
  quiz, 
  answers, 
  onRestart 
}: { 
  exam: Exam;
  quiz: Quiz; 
  answers: Record<number, string[]>;
  onRestart: () => void;
}) {
  const router = useRouter();
  // State to track expanded questions
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);

  // Toggle question expansion
  const toggleQuestion = (index: number) => {
    setExpandedQuestions(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  // Navigate back to exam page
  const navigateToExam = () => {
    router.push(`/exam/${exam.id}`);
  };

  // Calculate the number of correct answers
  const calculateScore = () => {
    let correctCount = 0;
    
    quiz.questions.forEach((question, index) => {
      const userAnswers = answers[index] || [];
      const correctAnswers = question.correctAnswers;
      
      // Check if arrays match (simplified, should compare contents)
      const isCorrect = 
        userAnswers.length === correctAnswers.length &&
        userAnswers.every(answer => correctAnswers.includes(answer)) &&
        correctAnswers.every(answer => userAnswers.includes(answer));
      
      if (isCorrect) correctCount++;
    });
    
    return correctCount;
  };
  
  const correctAnswers = calculateScore();
  const totalQuestions = quiz.questions.length;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">Quiz Completed!</h2>
        <p className="mt-2 text-gray-600">{quiz.title}</p>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Your score</span>
          <span className="text-sm font-medium text-gray-700">
            {correctAnswers} out of {totalQuestions} ({scorePercentage}%)
          </span>
        </div>
        <Progress value={scorePercentage} className="h-2" />
      </div>
      
      <div className="mt-8 space-y-4">
        {quiz.questions.map((question, index) => {
          const userAnswers = answers[index] || [];
          const correctAnswers = question.correctAnswers;
          
          const isCorrect = 
            userAnswers.length === correctAnswers.length &&
            userAnswers.every(answer => correctAnswers.includes(answer)) &&
            correctAnswers.every(answer => userAnswers.includes(answer));
          
          const isExpanded = expandedQuestions.includes(index);
          
          return (
            <div 
              key={index}
              className={`p-4 rounded-md ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}
            >
              <div 
                className="flex items-start cursor-pointer"
                onClick={() => toggleQuestion(index)}
              >
                <div className="mt-1 mr-2">
                  {isExpanded ? 
                    <ChevronDown size={16} className="text-gray-500" /> : 
                    <ChevronRight size={16} className="text-gray-500" />
                  }
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">{question.title}</h3>
                    <span className={`text-sm font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                </div>
              </div>
              
              {isExpanded && (
                <div className="mt-3 pl-6 border-l-2 border-gray-200">
                  <div className="mt-2">
                    <div className="text-xs font-medium text-gray-500">Your answer:</div>
                    <div className="text-sm mt-1">
                      {userAnswers.length > 0 
                        ? userAnswers.join(', ') 
                        : 'No answer provided'}
                    </div>
                  </div>
                  
                  {!isCorrect && (
                    <div className="mt-2">
                      <div className="text-xs font-medium text-gray-500">Correct answer:</div>
                      <div className="text-sm mt-1 text-green-600">
                        {correctAnswers.join(', ')}
                      </div>
                    </div>
                  )}

                  {question.explanation && (
                    <div className="mt-2">
                      <div className="text-xs font-medium text-gray-500">Explanation:</div>
                      <div className="text-sm mt-1 text-gray-700">
                        {question.explanation}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <Button 
        className="mt-8 w-full" 
        onClick={navigateToExam}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Return to Exam
      </Button>
    </div>
  );
}