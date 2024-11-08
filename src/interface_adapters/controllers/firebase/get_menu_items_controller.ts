import { getMenuItemsUseCase } from '@/domain/use_cases/firebase/get_menu_items_use_case';
import { MenuItems } from '@/entities/models/menuItem';

function presenter(menuItems: MenuItems[]) {
    return menuItems.map((item) => ({
        title: item.title,
    }));
}

export async function getMenuItemsController() {
    const menuItems = await getMenuItemsUseCase();
    return presenter(menuItems);
}