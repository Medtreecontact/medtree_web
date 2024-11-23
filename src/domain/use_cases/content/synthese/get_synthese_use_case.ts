import { getServerInjection } from "@/dependency_injection/server_container";

export async function getExamSyntheseUsecase(examId: string, syntheseId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const exam = await firebaseReposiory.getExamFromId(examId);
    const synthese = await firebaseReposiory.getSyntheseFromId(syntheseId);
    return {exam, synthese };
}