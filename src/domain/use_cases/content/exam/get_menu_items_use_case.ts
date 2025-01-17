import { getServerInjection } from "@/dependency_injection/server_container";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from '@/core/constants';

export async function getMenuItemsUseCase() {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const menuItems = await firebaseReposiory.getMenuItems();
    let examsAdvancement: { [key: string]: number }  = {};
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session)
    {
      const user = JSON.parse(session.value);
      const advancement = await firebaseReposiory.getUserCoursesAdvancement(user.id);
      examsAdvancement = advancement.examsAdvancement;
    }
    const updatedMenuItems = await Promise.all(
        menuItems.map(async (item) => {
          item.iconPath = await firebaseReposiory.getUrlFromDocumentPath(item.iconPath);
          const exam = await firebaseReposiory.getExamFromId(item.examRef.id);
          item.stepCount = exam.stepsRef.length;
          item.synthesesCount = exam.synthesesRef.length;
          item.examAdvancement = examsAdvancement[item.examRef.id] || 0;
          return item;
        })
      );
    const sortedMenuItems =  updatedMenuItems.sort((a, b) => a.priority - b.priority);
    return sortedMenuItems;
}