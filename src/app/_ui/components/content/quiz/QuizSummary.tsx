import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Progress } from "@/app/_ui/shadcn/components/ui/progress";
import { Exam } from "@/entities/models/exam";
import { Quiz } from "@/entities/models/quiz";
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronRight, HomeIcon, RotateCw, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { Separator } from "@/app/_ui/shadcn/components/ui/separator";
import { Badge } from "@/app/_ui/shadcn/components/ui/badge";

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
  
  // Define score color based on percentage
  const getScoreColor = () => {
    if (scorePercentage >= 80) return "text-emerald-600";
    if (scorePercentage >= 60) return "text-amber-600";
    return "text-rose-600";
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border border-gray-200">
        <CardHeader className="text-center pb-2 border-b bg-gray-50">
          <Badge className="mx-auto mb-1 bg-blue-100 text-blue-700 hover:bg-blue-200">Quiz Terminé</Badge>
          <CardTitle className="text-2xl font-bold">{quiz.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-4">
              <span className={`text-3xl font-bold ${getScoreColor()}`}>
                {scorePercentage}%
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-3">
              Vous avez répondu à {correctAnswers} sur {totalQuestions} questions correctement.
            </div>
            <Progress 
              value={scorePercentage} 
              className={`h-2 w-full max-w-xs mx-auto ${
                scorePercentage >= 80 ? "bg-emerald-500" :
                scorePercentage >= 60 ? "bg-amber-500" : "bg-rose-500"
              }`} 
            />
          </div>
          
          <Separator className="my-6" />
          
          <h3 className="text-lg font-semibold mb-4">Résumé des questions</h3>
          <div className="space-y-3">
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
                  className={`p-4 rounded-md border transition-all ${
                    isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'
                  }`}
                >
                  <div 
                    className="flex items-start cursor-pointer"
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="mt-1 mr-2 text-gray-500">
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800">
                          <span className="text-sm text-gray-500 mr-2">{index + 1}.</span>
                          {question.title}
                        </h3>
                        <div className="flex items-center">
                          {isCorrect ? 
                            <CheckCircle2 size={16} className="text-emerald-500 mr-2" /> : 
                            <XCircle size={16} className="text-rose-500 mr-2" />
                          }
                          <span className={`text-sm font-medium ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="mt-3 pl-6 border-l-2 border-gray-200">
                      <div className="mt-2">
                        <div className="text-xs font-medium text-gray-500">Votre réponse:</div>
                        <div className="text-sm mt-1">
                          {userAnswers.length > 0 
                            ? userAnswers.join(', ') 
                            : 'No answer provided'}
                        </div>
                      </div>
                      
                      {!isCorrect && (
                        <div className="mt-2">
                          <div className="text-xs font-medium text-gray-500">Réponse correcte:</div>
                          <div className="text-sm mt-1 text-emerald-600 font-medium">
                            {correctAnswers.join(', ')}
                          </div>
                        </div>
                      )}

                      {question.explanation && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-md">
                          <div className="text-xs font-medium text-blue-700">Explanation:</div>
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
          
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              className="flex-1 border-gray-300"
              onClick={onRestart}
            >
              <RotateCw className="mr-2 h-4 w-4" /> Réessayer
            </Button>
            <Button 
              className="flex-1" 
              onClick={navigateToExam}
            >
              <HomeIcon className="mr-2 h-4 w-4" /> Retour au cours
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}