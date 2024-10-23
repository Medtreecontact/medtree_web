import { getInjection } from "@/dependency_injection/container";

export async function getFirstAssetImageUrlUseCase() {

    const firebaseReposiory = getInjection("IFirebaseRepository");
    const menuItems = await firebaseReposiory.getFirstAssetImageUrl();
    return menuItems;
}