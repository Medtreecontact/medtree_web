import { getMenuItemsController } from "@/interface_adapters/controllers/firebase/get_menu_items_controller"
import { getFirstAssetImageUrlController } from "@/interface_adapters/controllers/firebase/get_first_asset_image_url_controller"

export default async function FirebasePage() {
    let menuItems: any[] = [];
    let imageUrl: string | null = null;

    try {
        menuItems = await getMenuItemsController();
        imageUrl = await getFirstAssetImageUrlController();
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
        {imageUrl && <img src={imageUrl} alt="Firebase Asset" />}
    </>
}