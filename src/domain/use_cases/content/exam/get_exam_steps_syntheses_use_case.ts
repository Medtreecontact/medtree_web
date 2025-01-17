import { SESSION_COOKIE_NAME } from "@/core/constants";
import { getServerInjection } from "@/dependency_injection/server_container";
import { cookies } from "next/headers";

export async function getExamStepsSynthesesUsecase(examId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const exam = await firebaseReposiory.getExamFromId(examId);
    let stepsAdvancement: { [key: string]: number }  = {};
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session)
    {
        const user = JSON.parse(session.value);
        const advancement = await firebaseReposiory.getUserCoursesAdvancement(user.id);
        stepsAdvancement = advancement.stepsAdvancement;
    }
    const steps = await Promise.all(
        exam.stepsRef.map(async (stepRef) => {
            const tempStep = await firebaseReposiory.getStepFromRef(stepRef);
            tempStep.stepAdvancement = stepsAdvancement[stepRef.id] || 0;
            return tempStep;
        })
    );
    const syntheses = await Promise.all(
        exam.synthesesRef.map(async (syntheseRef) => {
            return await firebaseReposiory.getSyntheseFromRef(syntheseRef);
        })
    );

    return { exam, steps, syntheses };
}