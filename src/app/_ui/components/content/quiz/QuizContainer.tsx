"use client";

import { Exam } from "@/entities/models/exam";
import { Quiz } from "@/entities/models/quiz";
import { useState, useEffect } from "react";
import QuizHeader from "./QuizHeader";
import QuizQuestion from "./QuizQuestion";
import QuizNavigation from "./QuizNavigation";
import QuizSummary from "./QuizSummary";

// Import the updateQuizAdvancement function
// Assuming it's from a service file - you'll need to provide the correct import path
import { updateQuizAdvancement } from "@/app/actions";

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
    <div className="flex flex-col space-y-8">
      <QuizHeader 
        title={quiz.title} 
        description={quiz.description} 
        difficulty={quiz.difficulty} 
        duration={quiz.duration} 
      />
      
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4 text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
        
        <QuizQuestion 
          question={currentQuestion} 
          selectedAnswers={answers[currentQuestionIndex] || []} 
          onSelectAnswers={handleAnswer}
          showExplanation={showExplanation}
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
      </div>
    </div>
  );
}