import { getImageUrlUsecase } from "@/domain/use_cases/content/synthese/get_image_url_use_case";

export async function getImageUrlController(imagePath: string) {
    const imageUrl = await getImageUrlUsecase(imagePath);
    return imageUrl;
}