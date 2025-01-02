import { getExamSyntheseUsecase } from "@/domain/use_cases/content/synthese/get_synthese_use_case";
import { unstable_cache as cache } from "next/cache";

async function getExamSyntheseControllerImpl(examId: string, syntheseId: string) {
    const examSynthese = await getExamSyntheseUsecase(examId, syntheseId);
    return examSynthese;
}

export const getExamSyntheseController = cache(
    /* fetch function */ getExamSyntheseControllerImpl,
    /* unique key     */ ["getExamSyntheseController"],
    /* options        */ {
      tags: ["getExamSyntheseController"],
      revalidate: 60 * 60 * 24 /* same as fetch.revalidate */
    }
  )