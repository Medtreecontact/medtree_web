import { getAnalysisResultByIdUsecase } from "@/domain/use_cases/content/station/get_analysis_result_by_id_use_case";

export async function getAnalysisResultByIdController(stationId: string) {
    const analysisResult = await getAnalysisResultByIdUsecase(stationId);
    return analysisResult;
}