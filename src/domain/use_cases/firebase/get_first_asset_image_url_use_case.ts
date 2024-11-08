import { getServerInjection } from "@/dependency_injection/server_container";

export async function getFirstAssetImageUrlUseCase() {

    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const menuItems = await firebaseReposiory.getFirstAssetImageUrl();
    return menuItems;
}