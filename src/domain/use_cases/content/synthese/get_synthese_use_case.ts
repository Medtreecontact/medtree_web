import { getServerInjection } from "@/dependency_injection/server_container";

export async function getExamSyntheseUsecase(examId: string, syntheseId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const exam = await firebaseReposiory.getExamFromId(examId);
    const currentSynthese = await firebaseReposiory.getSyntheseFromId(syntheseId);
    const syntheses = await Promise.all(
        exam.synthesesIds.map(async (syntheseId) => {
            return await firebaseReposiory.getSyntheseFromId(syntheseId);
        })
    );
    return {exam, currentSynthese, syntheses };
}