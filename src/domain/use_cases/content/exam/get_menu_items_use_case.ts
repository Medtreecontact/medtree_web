import { getServerInjection } from "@/dependency_injection/server_container";

export async function getMenuItemsUseCase() {

    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const menuItems = await firebaseReposiory.getMenuItems();
    const updatedMenuItems = await Promise.all(
        menuItems.map(async (item) => {
          item.iconPath = await firebaseReposiory.getUrlFromDocumentPath(item.iconPath);
          return item;
        })
      );
    return updatedMenuItems;
}