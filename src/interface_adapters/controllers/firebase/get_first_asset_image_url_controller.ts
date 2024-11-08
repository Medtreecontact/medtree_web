import { getFirstAssetImageUrlUseCase} from "@/domain/use_cases/firebase/get_first_asset_image_url_use_case"

export async function getFirstAssetImageUrlController() {
    return await getFirstAssetImageUrlUseCase();
}