import { getMenuItemsUseCase } from '@/domain/use_cases/content/exam/get_menu_items_use_case';
import { MenuItem } from '@/entities/models/menu_item';

function presenter(menuItems: MenuItem[]) {
    return menuItems.map((item) => ({
        title: item.title,
    }));
}

export async function getMenuItemsController() {
    return await getMenuItemsUseCase();
    // return presenter(menuItems);
}