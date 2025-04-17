import QuizContainer from "@/app/_ui/components/content/quiz/QuizContainer";
import { getExamQuizController } from "@/interface_adapters/controllers/content/quiz/get_quiz_controller";
import { Metadata } from "next";

export default async function QuizPage(props: {params: Promise<{ examId: string, quizId: string }>}) {
  const params = await props.params;
  const { exam, quiz } = await getExamQuizController(params.examId, params.quizId);
  
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <QuizContainer exam={exam} quiz={quiz} />
    </div>
  );
}