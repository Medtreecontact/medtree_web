import { getMenuItemsUseCase } from '@/domain/use_cases/content/exam/get_menu_items_use_case';

export async function getMenuItemsController() {
    const menuItems = await getMenuItemsUseCase();
    return menuItems;
}
