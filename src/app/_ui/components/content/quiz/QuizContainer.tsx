"use client";

import { Exam } from "@/entities/models/exam";
import { Quiz } from "@/entities/models/quiz";
import { useState } from "react";
import QuizHeader from "./QuizHeader";
import QuizQuestion from "./QuizQuestion";
import QuizNavigation from "./QuizNavigation";
import QuizSummary from "./QuizSummary";
import { updateQuizAdvancement } from "@/app/actions/actions";
import { Card, CardContent } from "@/app/_ui/shadcn/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function QuizContainer({ exam, quiz }: { exam: Exam; quiz: Quiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  
  const handleAnswer = (selectedAnswers: string[]) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: selectedAnswers
    });
  };
  
  // Calculate score when quiz is completed
  const calculateScore = () => {
    let correctCount = 0;
    
    quiz.questions.forEach((question, index) => {
      const userAnswers = answers[index] || [];
      const correctAnswers = question.correctAnswers;
      
      const isCorrect = 
        userAnswers.length === correctAnswers.length &&
        userAnswers.every(answer => correctAnswers.includes(answer)) &&
        correctAnswers.every(answer => userAnswers.includes(answer));
      
      if (isCorrect) correctCount++;
    });
    
    return correctCount;
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setShowExplanation(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score when completing the quiz
      const calculatedScore = calculateScore();
      setScore(calculatedScore);
      setIsCompleted(true);
      
      // Update quiz advancement in the database
      updateQuizAdvancement(exam.id, quiz.id, calculatedScore);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setShowExplanation(false);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const checkAnswer = () => {
    setShowExplanation(true);
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setShowExplanation(false);
  };
  
  if (isCompleted) {
    return <QuizSummary exam={exam} quiz={quiz} answers={answers} onRestart={restartQuiz} />;
  }
  
  return (
    <div className="flex flex-col space-y-6">
      <QuizHeader 
        title={quiz.title} 
        description={quiz.description} 
        difficulty={quiz.difficulty} 
        duration={quiz.duration} 
      />
      
      <Card className="border border-gray-200">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex-1 mr-4">
              <h2 className="text-xl font-medium text-gray-800">{currentQuestion.title}</h2>
            </div>
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
              Question {currentQuestionIndex + 1} sur {totalQuestions}
            </span>
          </div>
          
          <QuizQuestion 
            question={currentQuestion} 
            selectedAnswers={answers[currentQuestionIndex] || []} 
            onSelectAnswers={handleAnswer}
            showExplanation={showExplanation}
            hideTitle={true}
          />
          
          <QuizNavigation 
            currentIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            onNext={goToNextQuestion}
            onPrevious={goToPreviousQuestion}
            onCheck={checkAnswer}
            showExplanation={showExplanation}
            hasSelectedAnswers={Boolean(answers[currentQuestionIndex]?.length)}
          />
        </CardContent>
      </Card>
    </div>
  );
}