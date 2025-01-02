import { getMenuItemsUseCase } from '@/domain/use_cases/content/exam/get_menu_items_use_case';
import { MenuItem } from '@/entities/models/menu_item';
import { access } from 'fs';
import { unstable_cache as cache } from "next/cache";

function presenter(menuItems: MenuItem[]) {
    return menuItems.map((item) => ({
        access: item.access,
        examId: item.examRef.id,
        iconPath: item.iconPath,
        id: item.id,
        priority: item.priority,
        stepCount: item.stepCount,
        synthesesCount: item.synthesesCount,
        title: item.title,
        update: item.update,
    }));
}

async function getMenuItemsControllerImpl() {
    const menuItems = await getMenuItemsUseCase();
    return presenter(menuItems);
}

export const getMenuItemsController = cache(
    /* fetch function */ getMenuItemsControllerImpl,
    /* unique key     */ ["getMenuItemsController"],
    /* options        */ {
      tags: ["getExamStepsSynthesesController"],
      revalidate: 60 * 60 * 24 /* same as fetch.revalidate */
    }
  )