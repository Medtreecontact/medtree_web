import { getUrlFromDocumentPathUseCase } from "@/domain/use_cases/content/exam/get_menu_items_assets_use_case";

export async function getUrlFromDocumentPathController(assetsPaths: string[]) {
    return await getUrlFromDocumentPathUseCase(assetsPaths);
}