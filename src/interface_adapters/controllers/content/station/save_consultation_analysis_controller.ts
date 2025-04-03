import { saveConsultationAnalysisUsecase } from "@/domain/use_cases/content/station/save_consultation_analysis_use_case";
import { AiEcosDiscussion } from "@/entities/models/ai_ecos_discussion";

export async function saveConsultationAnalysisController(analysisResult: AiEcosDiscussion) {
    return await saveConsultationAnalysisUsecase(analysisResult);
}