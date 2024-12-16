import { getStepSubstepUsecase } from "@/domain/use_cases/content/substep/get_substep_use_case";

export async function getStepSubstepController(examId: string, stepId: string, substepId: string) {
    const stepSubstep = await getStepSubstepUsecase(examId, stepId,  substepId);
    return stepSubstep;
}