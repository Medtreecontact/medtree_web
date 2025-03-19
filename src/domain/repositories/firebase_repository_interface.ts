import { CoursesAdvancement } from "@/entities/models/courses_advancement";
import { Exam } from "@/entities/models/exam";
import { MenuItem } from "@/entities/models/menu_item";
import { Quiz } from "@/entities/models/quiz";
import { Station } from "@/entities/models/station";
import { Step } from "@/entities/models/step";
import { Substep } from "@/entities/models/substep";
import { Synthese } from "@/entities/models/synthese";
import { UserAccount } from "@/entities/models/user_account";

export interface IFirebaseRepository {
    getUserAccount(uid :string): Promise<any>;
    createUserAccount(userAccount: UserAccount): Promise<any>;
    updateUserAccount(uid: string, updatedAccount: UserAccount): Promise<void>;
    getMenuItems(): Promise<MenuItem[]>;
    getExams(): Promise<Exam[]>;
    getSteps(): Promise<Step[]>;
    getSubsteps(): Promise<Substep[]>;
    getSyntheses(): Promise<Synthese[]>;
    getStations(): Promise<Station[]>;
    getUrlFromDocumentPath(path: string): Promise<string>;
    uploadFile(path: string, file: File): Promise<void>;
    getExamFromId(examId: string): Promise<Exam>;
    getSyntheseFromId(syntheseId: string): Promise<Synthese>;
    getStepFromId(stepId: string): Promise<Step>;
    getSubstepFromId(substepId: string): Promise<Substep>;
    getQuizFromId(quizId: string): Promise<Quiz>;
    getStationFromId(stationId: string): Promise<Station>;
    getUserCoursesAdvancement(userId: string): Promise<CoursesAdvancement>;
    updateUserAdvancement(userId: string, advancement: CoursesAdvancement): Promise<void>;
    sendMessage(message: string, userId: string): Promise<void>;
    requestAccountData(userId: string): Promise<void>;
    requestAccountDeletion(userId: string): Promise<void>;
    updateCommunicationsPreferences(type: string, value: boolean, userId: string): Promise<void>;
}