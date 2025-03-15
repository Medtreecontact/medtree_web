import { SESSION_COOKIE_NAME } from "@/core/constants";
import { getServerInjection } from "@/dependency_injection/server_container";
import { cookies } from "next/headers";

export async function updateQuizAdvancementUsecase(quizId: string, score: number) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session)
    {
        const user = JSON.parse(session.value);
        const advancement = await firebaseReposiory.getUserCoursesAdvancement(user.id);
        // update readSubsteps
        advancement.quizzesAdvancement[quizId] = score

        await firebaseReposiory.updateUserAdvancement(user.id, advancement);
    }

}