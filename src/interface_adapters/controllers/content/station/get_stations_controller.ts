import { getStationsUsecase } from "@/domain/use_cases/content/station/get_stations_use_case";

export async function getStationsController() {
    const stations = await getStationsUsecase();
    return stations;
}