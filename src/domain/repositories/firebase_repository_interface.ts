import { UserAccount } from "@/entities/models/user_account";

export interface IFirebaseRepository {
    getUserAccount(uid :string): Promise<any>;
    createUserAccount(userAccount: UserAccount): Promise<any>;
    updateUserAccount(uid: string, updatedAccount: UserAccount): Promise<void>;
    getMenuItems(): Promise<any[]>;
    getFirstAssetImageUrl(): Promise<string>;
}