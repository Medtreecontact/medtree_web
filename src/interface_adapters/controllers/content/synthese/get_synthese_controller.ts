import { getSyntheseUsecase } from "@/domain/use_cases/content/synthese/get_synthese_use_case";

export async function getSyntheseController(syntheseId: string) {
    const synthese = await getSyntheseUsecase(syntheseId);
    return synthese;
}