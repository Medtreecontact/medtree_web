import { getServerInjection } from "@/dependency_injection/server_container";

export async function getExamStepsSynthesesUsecase(examId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const exam = await firebaseReposiory.getExamFromId(examId);
    const steps = await Promise.all(
        exam.stepsRef.map(async (stepRef) => {
            return await firebaseReposiory.getStepFromRef(stepRef);
        })
    );
    const syntheses = await Promise.all(
        exam.synthesesRef.map(async (syntheseRef) => {
            return await firebaseReposiory.getSyntheseFromRef(syntheseRef);
        })
    );

    return { exam, steps, syntheses };
}