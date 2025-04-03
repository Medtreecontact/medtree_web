import { SESSION_COOKIE_NAME } from "@/core/constants";
import { getServerInjection } from "@/dependency_injection/server_container";
import { cookies } from "next/headers";

export async function updateStationAdvancementUsecase(stationId: string, score: number, isSolo: boolean) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session)
    {
        const user = JSON.parse(session.value);
        const advancement = await firebaseReposiory.getUserCoursesAdvancement(user.id);

        // Find existing station advancement record
        const existingStationIndex = advancement.stationsAdvancement.findIndex(
            station => station.stationId === stationId
        );
        
        const currentDate = new Date();
        
        if (existingStationIndex !== -1) {
            // Update existing station record
            if (isSolo) {
                advancement.stationsAdvancement[existingStationIndex].soloScore = score;
                advancement.stationsAdvancement[existingStationIndex].soloDate = currentDate;
            } else {
                advancement.stationsAdvancement[existingStationIndex].multiScore = score;
                advancement.stationsAdvancement[existingStationIndex].multiDate = currentDate;
            }
        } else {
            // Create new station record
            const newStationAdvancement = {
                stationId: stationId,
                soloDate: isSolo ? currentDate : new Date(0),
                multiDate: isSolo ? new Date(0) : currentDate,
                soloScore: isSolo ? score : 0,
                multiScore: isSolo ? 0 : score
            };
            
            advancement.stationsAdvancement.push(newStationAdvancement);
        }

        await firebaseReposiory.updateUserAdvancement(user.id, advancement);
    }

}