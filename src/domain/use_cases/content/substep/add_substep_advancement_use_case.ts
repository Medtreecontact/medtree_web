import { SESSION_COOKIE_NAME } from "@/core/constants";
import { getServerInjection } from "@/dependency_injection/server_container";
import { cookies } from "next/headers";

export async function addSubstepAdvancementUsecase(examId: string, stepId: string, substepId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session)
    {
        const user = JSON.parse(session.value);
        const advancement = await firebaseReposiory.getUserCoursesAdvancement(user.id);
        // update readSubsteps
        advancement.readSubsteps.push(substepId);

        // update stepsAdvancement
        const step = await firebaseReposiory.getStepFromId(stepId);
        const substeps = step.substepsRef.map(substepRef => substepRef.id);
        const stepLength = substeps.length;

        const readSubstepsInStep = substeps.filter(substep => advancement.readSubsteps.includes(substep)).length;

        advancement.stepsAdvancement[stepId] = (readSubstepsInStep / stepLength) * 100;
        
        // update examAdvancement
        const exam = await firebaseReposiory.getExamFromId(examId);
        const steps = exam.stepsRef.map(stepRef => stepRef.id);
        const examLength = steps.length;

        const stepsAdvancementSum = steps.reduce((sum, stepId) => {
            return sum + (advancement.stepsAdvancement[stepId] || 0);
        }, 0);

        advancement.examsAdvancement[examId] = (stepsAdvancementSum / examLength);

        await firebaseReposiory.updateUserAdvancement(user.id, advancement);
    }

}