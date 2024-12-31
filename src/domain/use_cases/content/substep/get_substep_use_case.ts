import { getServerInjection } from "@/dependency_injection/server_container";

export async function getStepSubstepUsecase(examId: string, stepId: string, substepId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const exam = await firebaseReposiory.getExamFromId(examId);
    const step = await firebaseReposiory.getStepFromId(stepId);
    const currentSubstep = await firebaseReposiory.getSubstepFromId(substepId);
    const substeps = await Promise.all(
        step.substepsRef.map(async (substepRef) => {
            return await firebaseReposiory.getSubstepFromRef(substepRef);
        })
    );
    return { exam, step, currentSubstep, substeps };
}