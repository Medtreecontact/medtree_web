import { SESSION_COOKIE_NAME } from "@/core/constants";
import { getServerInjection } from "@/dependency_injection/server_container";
import { cookies } from "next/headers";

export async function getStationByIdUsecase(stationId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const station = await firebaseReposiory.getStationFromId(stationId);
    // let stepsAdvancement: { [key: string]: number }  = {};
    // let readSubsteps: string[] = [];
    // const session = (await cookies()).get(SESSION_COOKIE_NAME);
    // if (session)
    // {
    //     const user = JSON.parse(session.value);
    //     const advancement = await firebaseReposiory.getUserCoursesAdvancement(user.id);
    //     stepsAdvancement = advancement.stepsAdvancement;
    //     readSubsteps = advancement.readSubsteps;
    // }
    // const steps = await Promise.all(
    //     exam.stepsIds.map(async (stepId) => {
    //         const tempStep = await firebaseReposiory.getStepFromId(stepId);
    //         tempStep.stepAdvancement = stepsAdvancement[tempStep.id] || 0;
    //         return tempStep;
    //     })
    // );

    return station;

}