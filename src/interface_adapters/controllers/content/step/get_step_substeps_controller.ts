import { getExamStepSubstepsUsecase } from "@/domain/use_cases/content/step/get_step_substeps_use_case";
import { unstable_cache as cache } from "next/cache";

async function getExamStepSubstepsControllerImpl(examId: string, stepId: string) {
    const examStepSubstep = await getExamStepSubstepsUsecase(examId, stepId);
    return examStepSubstep;
}

export const getExamStepSubstepsController = cache(
    /* fetch function */ getExamStepSubstepsControllerImpl,
    /* unique key     */ ["getExamStepSubstepsController"],
    /* options        */ {
      tags: ["getExamStepSubstepsController"],
      revalidate: 60 * 60 * 24 /* same as fetch.revalidate */
    }
  )