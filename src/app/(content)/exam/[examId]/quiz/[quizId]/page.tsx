import QuizContainer from "@/app/_ui/components/content/quiz/QuizContainer";
import { getExamQuizController } from "@/interface_adapters/controllers/content/quiz/get_quiz_controller";

export default async function QuizPage(props: {params: Promise<{ examId: string, quizId: string }>}) {
  const params = await props.params;
  const { exam, quiz } = await getExamQuizController(params.examId, params.quizId);
  
  return (
    <div className="container mx-auto py-8">
      <QuizContainer exam={exam} quiz={quiz} />
    </div>
  );
}