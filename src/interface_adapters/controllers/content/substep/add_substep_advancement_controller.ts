import { addSubstepAdvancementUsecase } from "@/domain/use_cases/content/substep/add_substep_advancement_use_case";

export async function addSubstepAdvancementController(examId: string, stepId:string, substepId: string) {
    await addSubstepAdvancementUsecase(examId, stepId, substepId);
}