import { getStepSubstepUsecase } from "@/domain/use_cases/content/substep/get_substep_use_case";
import { unstable_cache as cache } from "next/cache";

async function getStepSubstepControllerImpl(examId: string, stepId: string, substepId: string) {
    const stepSubstep = await getStepSubstepUsecase(examId, stepId,  substepId);
    return stepSubstep;
}

export const getStepSubstepController = cache(
    /* fetch function */ getStepSubstepControllerImpl,
    /* unique key     */ ["getStepSubstepController"],
    /* options        */ {
      tags: ["getStepSubstepController"],
      revalidate: 60 * 60 * 24 /* same as fetch.revalidate */
    }
  )