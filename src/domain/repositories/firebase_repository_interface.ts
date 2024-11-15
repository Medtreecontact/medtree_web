import { Exam } from "@/entities/models/exam";
import { Step } from "@/entities/models/step";
import { Synthese } from "@/entities/models/synthese";
import { UserAccount } from "@/entities/models/user_account";
import { DocumentReference } from "firebase-admin/firestore";

export interface IFirebaseRepository {
    getUserAccount(uid :string): Promise<any>;
    createUserAccount(userAccount: UserAccount): Promise<any>;
    updateUserAccount(uid: string, updatedAccount: UserAccount): Promise<void>;
    getMenuItems(): Promise<any[]>;
    getFirstAssetImageUrl(): Promise<string>;
    getExamFromId(examId: string): Promise<Exam>;
    getSyntheseFromId(syntheseId: string): Promise<Synthese>;
    getStepFromRef(stepRef: DocumentReference): Promise<Step>;
    getSyntheseFromRef(syntheseRef: DocumentReference): Promise<Synthese>;
}