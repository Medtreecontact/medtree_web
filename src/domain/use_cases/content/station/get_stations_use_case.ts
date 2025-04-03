import { SESSION_COOKIE_NAME } from "@/core/constants";
import { getServerInjection } from "@/dependency_injection/server_container";
import { cookies } from "next/headers";
import { CoursesAdvancement } from "@/entities/models/courses_advancement";

export async function getStationsUsecase() {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const stations = await firebaseReposiory.getStations();
    let stationsAdvancement: CoursesAdvancement['stationsAdvancement'] = [];

    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session)
    {
        const user = JSON.parse(session.value);
        const advancement = await firebaseReposiory.getUserCoursesAdvancement(user.id);
        stationsAdvancement = advancement.stationsAdvancement;
    }

    await Promise.all(
        stations.map(async (station) => {
            // Find advancement record for this specific station
            const stationAdvancement = stationsAdvancement.find(
                advancement => advancement.stationId === station.id
            );
            
            // Assign the found advancement data to station.lastResult
            if (stationAdvancement) {
                station.lastResult = stationAdvancement;
            }
        })
    );
    
    return stations;
}