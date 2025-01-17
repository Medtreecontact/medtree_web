import { SESSION_COOKIE_NAME } from "@/core/constants";
import { getServerInjection } from "@/dependency_injection/server_container";
import { cookies } from "next/headers";

export async function getExamStepSubstepsUsecase(examId: string, stepId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const exam = await firebaseReposiory.getExamFromId(examId);
    let stepsAdvancement: { [key: string]: number }  = {};
    let readSubsteps: string[] = [];
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session)
    {
        const user = JSON.parse(session.value);
        const advancement = await firebaseReposiory.getUserCoursesAdvancement(user.id);
        stepsAdvancement = advancement.stepsAdvancement;
        readSubsteps = advancement.readSubsteps;
    }
    const steps = await Promise.all(
        exam.stepsRef.map(async (stepRef) => {
            const tempStep = await firebaseReposiory.getStepFromRef(stepRef);
            tempStep.stepAdvancement = stepsAdvancement[tempStep.id] || 0;
            return tempStep;
        })
    );
    const currentStep = steps.find((step) => step.id === stepId);
    if (!currentStep) {
        throw new Error("Step not found");
    }
    const substeps = await Promise.all(
        currentStep.substepsRef.map(async (substepRef) => {
            const tempSubstep = await firebaseReposiory.getSubstepFromRef(substepRef);
            tempSubstep.readSubstep = readSubsteps.includes(tempSubstep.id) || false;
            return tempSubstep;
        })
    );

    return { exam, steps, currentStep, substeps };

}