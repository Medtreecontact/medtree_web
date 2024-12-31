import { getServerInjection } from "@/dependency_injection/server_container";

export async function getExamStepSubstepsUsecase(examId: string, stepId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const exam = await firebaseReposiory.getExamFromId(examId);
    const steps = await Promise.all(
        exam.stepsRef.map(async (stepRef) => {
            return await firebaseReposiory.getStepFromRef(stepRef);
        })
    );
    const currentStep = steps.find((step) => step.id === stepId);
    if (!currentStep) {
        throw new Error("Step not found");
    }
    const substeps = await Promise.all(
        currentStep.substepsRef.map(async (substepRef) => {
            return await firebaseReposiory.getSubstepFromRef(substepRef);
        })
    );

    return { exam, steps, currentStep, substeps };

}