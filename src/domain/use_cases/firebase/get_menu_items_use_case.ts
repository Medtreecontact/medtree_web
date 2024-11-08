import { getServerInjection } from "@/dependency_injection/server_container";

export async function getMenuItemsUseCase() {

    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const menuItems = await firebaseReposiory.getMenuItems();
    return menuItems;
}