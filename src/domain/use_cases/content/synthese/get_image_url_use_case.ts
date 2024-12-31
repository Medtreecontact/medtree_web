import { getServerInjection } from "@/dependency_injection/server_container";

export async function getImageUrlUsecase(imagePath: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const imageUrl = await firebaseReposiory.getUrlFromDocumentPath(imagePath);
    return imageUrl;
}