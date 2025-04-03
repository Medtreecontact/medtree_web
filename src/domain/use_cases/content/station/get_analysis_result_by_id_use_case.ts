import { SESSION_COOKIE_NAME } from "@/core/constants";
import { getServerInjection } from "@/dependency_injection/server_container";
import { cookies } from "next/headers";

export async function getAnalysisResultByIdUsecase(analysisId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const analysisResult = await firebaseReposiory.getAnalysisResultFromId(analysisId);

    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    let user = null;
    if (session)
    {
        user = JSON.parse(session.value);
    }
    if (analysisResult.userId === "anonymous" || user.id == analysisResult.userId )
    {
        return analysisResult;
    }
    throw new Error("User not authorized to view this analysis result");
}