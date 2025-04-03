import { updateStationAdvancementUsecase } from "@/domain/use_cases/content/station/update_station_advancement_use_case";

export async function updateStationAdvancementController(stationId:string, score: number, isSolo: boolean) {
    await updateStationAdvancementUsecase(stationId, score, isSolo);
}