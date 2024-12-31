import { getExamStepSubstepsUsecase } from "@/domain/use_cases/content/step/get_step_substeps_use_case";

export async function getExamStepSubstepsController(examId: string, stepId: string) {
    const examStepSubstep = await getExamStepSubstepsUsecase(examId, stepId);
    return examStepSubstep;
}