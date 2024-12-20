import { getServerInjection } from "@/dependency_injection/server_container";

export async function getMenuItemsUseCase() {

    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const menuItems = await firebaseReposiory.getMenuItems();
    const updatedMenuItems = await Promise.all(
        menuItems.map(async (item) => {
          item.iconPath = await firebaseReposiory.getUrlFromDocumentPath(item.iconPath);
          const exam = await firebaseReposiory.getExamFromId(item.examRef.id);
          item.stepCount = exam.stepsRef.length;
          item.synthesesCount = exam.synthesesRef.length;
          return item;
        })
      );
    const sortedMenuItems =  updatedMenuItems.sort((a, b) => a.priority - b.priority);
    return sortedMenuItems;
}