import { getServerInjection } from "@/dependency_injection/server_container";

export async function getUrlFromDocumentPathUseCase(assetsPaths: string[]) {

    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const menuItems = await Promise.all(
        assetsPaths.map(async (assetPath) => {
            return await firebaseReposiory.getUrlFromDocumentPath(assetPath);
        })
    );
    return menuItems;
}