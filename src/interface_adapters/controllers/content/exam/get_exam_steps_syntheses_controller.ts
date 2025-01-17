import { getExamStepsSynthesesUsecase } from '@/domain/use_cases/content/exam/get_exam_steps_syntheses_use_case';
import { unstable_cache as cache } from "next/cache";

export async function getExamStepsSynthesesController(examId: string) {
    const examStepsSyntheses = await getExamStepsSynthesesUsecase(examId);
    return examStepsSyntheses;
}

// export const getExamStepsSynthesesController = cache(
//     /* fetch function */ getExamStepsSynthesesControllerImpl,
//     /* unique key     */ ["getExamStepsSynthesesController"],
//     /* options        */ {
//       tags: ["getExamStepsSynthesesController"],
//       revalidate: 60 * 60 * 24 /* same as fetch.revalidate */
//     }
//   )