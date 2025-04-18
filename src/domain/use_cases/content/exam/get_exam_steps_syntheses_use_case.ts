import { SESSION_COOKIE_NAME } from "@/core/constants";
import { getServerInjection } from "@/dependency_injection/server_container";
import { cookies } from "next/headers";

export async function getExamStepsSynthesesUsecase(examId: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    const exam = await firebaseReposiory.getExamFromId(examId);
    let stepsAdvancement: { [key: string]: number }  = {};
    let quizzesAdvancement: { [key: string]: number }  = {};
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session)
    {
        const user = JSON.parse(session.value);
        const advancement = await firebaseReposiory.getUserCoursesAdvancement(user.id);
        stepsAdvancement = advancement.stepsAdvancement;
        quizzesAdvancement = advancement.quizzesAdvancement;
    }
    const steps = await Promise.all(
        exam.stepsIds.map(async (stepId) => {
            const tempStep = await firebaseReposiory.getStepFromId(stepId);
            tempStep.stepAdvancement = stepsAdvancement[stepId] || 0;
            return tempStep;
        })
    );
    const syntheses = await Promise.all(
        exam.synthesesIds.map(async (syntheseId) => {
            return await firebaseReposiory.getSyntheseFromId(syntheseId);
        })
    );

    const quizzes = await Promise.all(
        exam.quizzesIds.map(async (quizId) => {
            const tempQuiz = await firebaseReposiory.getQuizFromId(quizId);
            tempQuiz.quizzAdvancement = quizzesAdvancement[quizId] || 0;
            return tempQuiz;
        })
    );

    return { exam, steps, syntheses, quizzes };
}