import { getExamStepsSynthesesUsecase } from '@/domain/use_cases/content/exam/get_exam_steps_syntheses_use_case';

export async function getExamStepsSynthesesController(examId: string) {
    const examStepsSyntheses = await getExamStepsSynthesesUsecase(examId);
    return examStepsSyntheses;
}