import { SESSION_COOKIE_NAME } from "@/core/constants";
import { getServerInjection } from "@/dependency_injection/server_container";
import { Substep } from "@/entities/models/substep";
import { cookies } from "next/headers";

export async function getStepSubstepUsecase(examId: string, stepId: string, substepId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const exam = await firebaseReposiory.getExamFromId(examId);
    const step = await firebaseReposiory.getStepFromId(stepId);
    let readSubsteps: string[] = [];
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session)
    {
        const user = JSON.parse(session.value);
        const advancement = await firebaseReposiory.getUserCoursesAdvancement(user.id);
        readSubsteps = advancement.readSubsteps;
    }
    const substeps = await Promise.all(
        step.substepsIds.map(async (substepId) => {
            const tempSubstep = await firebaseReposiory.getSubstepFromId(substepId);
            tempSubstep.readSubstep = readSubsteps.includes(tempSubstep.id) || false;
            return tempSubstep;
        })
    );
    const currentSubstep = substeps.find(substep => substep.id === substepId) as Substep;
    return { exam, step, currentSubstep, substeps };
}