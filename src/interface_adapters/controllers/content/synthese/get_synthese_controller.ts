import { getExamSyntheseUsecase } from "@/domain/use_cases/content/synthese/get_synthese_use_case";

export async function getExamSyntheseController(examId: string, syntheseId: string) {
    const examSynthese = await getExamSyntheseUsecase(examId, syntheseId);
    return examSynthese;
}