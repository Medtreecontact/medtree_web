import { requestAccountDataUseCase } from "@/domain/use_cases/settings/request_account_data_use_case";

export async function requestAccountDataController() {
    try {   
        return await requestAccountDataUseCase();
    } catch (error) {
        console.error(error);
        return "Erreur lors de votre demande. Vérifiez votre connexion internet et veuillez réessayer.";
    }
}
