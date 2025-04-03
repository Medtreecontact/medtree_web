import { getServerInjection } from "@/dependency_injection/server_container";
import { AiEcosDiscussion } from "@/entities/models/ai_ecos_discussion";

export async function saveConsultationAnalysisUsecase(analysisResult: AiEcosDiscussion) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    return await firebaseReposiory.saveConsultationAnalysis(analysisResult);
}