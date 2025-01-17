import { removeSubstepAdvancementUsecase } from "@/domain/use_cases/content/substep/remove_substep_advancement_use_case";

export async function removeSubstepAdvancementController(examId: string, stepId:string, substepId: string) {
    await removeSubstepAdvancementUsecase(examId, stepId, substepId);
}