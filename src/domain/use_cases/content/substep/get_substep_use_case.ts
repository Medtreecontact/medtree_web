import { getServerInjection } from "@/dependency_injection/server_container";

export async function getStepSubstepUsecase(examId: string, stepId: string, substepId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const exam = await firebaseReposiory.getExamFromId(examId);
    const substep = await firebaseReposiory.getSubstepFromId(substepId);
    const step = await firebaseReposiory.getStepFromId(stepId);
    return { exam, step, substep };
}