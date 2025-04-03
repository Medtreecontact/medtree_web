import { getStationByIdUsecase } from "@/domain/use_cases/content/station/get_station_by_id_use_case";
import { SESSION_COOKIE_NAME } from "@/core/constants";
import { getServerInjection } from "@/dependency_injection/server_container";
import { cookies } from "next/headers";
import { CoursesAdvancement } from "@/entities/models/courses_advancement";

export async function getStationByIdController(stationId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const station = await getStationByIdUsecase(stationId);
    let stationsAdvancement: CoursesAdvancement['stationsAdvancement'] = [];
    
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session)
    {
        const user = JSON.parse(session.value);
        const advancement = await firebaseReposiory.getUserCoursesAdvancement(user.id);
        stationsAdvancement = advancement.stationsAdvancement;
    }
    

    // Find advancement record for this specific station
    const stationAdvancement = stationsAdvancement.find(
        advancement => advancement.stationId === station.id
    );
                
    // Assign the found advancement data to station.lastResult
    if (stationAdvancement) {
        station.lastResult = stationAdvancement;
    }

    await Promise.all( station.annexes.map(async (annex) => {
        if (annex.type === "image") {
            annex.path = await firebaseReposiory.getUrlFromDocumentPath(annex.path);
        }
        })
    );

    return station;
}