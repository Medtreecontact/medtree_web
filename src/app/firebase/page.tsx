import { getMenuItemsController } from "@/interface_adapters/controllers/content/exam/get_menu_items_controller"

export default async function FirebasePage() {
    let menuItems: any[] = [];

    try {
        menuItems = await getMenuItemsController();
    } catch (error) {
        console.error(error);
    }

    return <>
        <p>Firebase</p>
        <br/>
        <ul>
            {menuItems.map((item, index) => (
                <li key={index}>{item.title}</li>
            ))}
        </ul>
    </>
}