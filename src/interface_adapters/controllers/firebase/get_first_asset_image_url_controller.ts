import { getFirstAssetImageUrlUseCase} from "@/domain/use_cases/get_first_asset_image_url_use_case"

export async function getFirstAssetImageUrlController() {
    const url = await getFirstAssetImageUrlUseCase();
    return url;
}