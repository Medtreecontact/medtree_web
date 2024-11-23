import { getServerInjection } from "@/dependency_injection/server_container";

export async function getStepSubstepUsecase(stepId: string, substepId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const substep = await firebaseReposiory.getSubstepFromId(substepId);
    const step = await firebaseReposiory.getStepFromId(stepId);
    return { step, substep };
}