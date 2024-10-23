import { getInjection } from "@/dependency_injection/container";

export async function getMenuItemsUseCase() {

    const firebaseReposiory = getInjection("IFirebaseRepository");
    const menuItems = await firebaseReposiory.getMenuItems();
    return menuItems;
}