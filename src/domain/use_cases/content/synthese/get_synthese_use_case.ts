import { getServerInjection } from "@/dependency_injection/server_container";

export async function getSyntheseUsecase(SyntheseId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const synthese = await firebaseReposiory.getSyntheseFromId(SyntheseId);
    return synthese;
}