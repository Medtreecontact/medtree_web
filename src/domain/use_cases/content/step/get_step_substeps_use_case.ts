import { getServerInjection } from "@/dependency_injection/server_container";

export async function getExamStepSubstepsUsecase(examId: string, stepId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const exam = await firebaseReposiory.getExamFromId(examId);
    const step = await firebaseReposiory.getStepFromId(stepId);
    const substeps = await Promise.all(
        step.substepsRef.map(async (substepRef) => {
            return await firebaseReposiory.getSubstepFromRef(substepRef);
        })
    );

    return { exam, step, substeps };

}