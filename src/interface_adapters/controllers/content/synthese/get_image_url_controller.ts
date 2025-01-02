import { getImageUrlUsecase } from "@/domain/use_cases/content/synthese/get_image_url_use_case";
import { unstable_cache as cache } from "next/cache";

async function getImageUrlControllerImpl(imagePath: string) {
    const imageUrl = await getImageUrlUsecase(imagePath);
    return imageUrl;
}

export const getImageUrlController = cache(
    /* fetch function */ getImageUrlControllerImpl,
    /* unique key     */ ["getImageUrlController"],
    /* options        */ {
      tags: ["getImageUrlController"],
      revalidate: 60 * 60 * 24 /* same as fetch.revalidate */
    }
  )