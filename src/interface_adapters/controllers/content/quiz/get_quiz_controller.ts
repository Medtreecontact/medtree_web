import { getExamQuizUsecase } from "@/domain/use_cases/content/quiz/get_quiz_use_case";

export async function getExamQuizController(examId: string, quizId: string) {
    const examStepSubstep = await getExamQuizUsecase(examId, quizId);
    return examStepSubstep;
}

