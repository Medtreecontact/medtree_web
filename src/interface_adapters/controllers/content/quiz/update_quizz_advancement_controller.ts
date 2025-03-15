import { updateQuizAdvancementUsecase } from "@/domain/use_cases/content/quiz/update_quiz_advancement_use_case";

export async function updateQuizAdvancementController(quizId:string, score: number) {
    await updateQuizAdvancementUsecase(quizId, score);
}