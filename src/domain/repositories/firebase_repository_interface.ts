export interface IFirebaseRepository {
    getMenuItems(): Promise<any[]>;
    getFirstAssetImageUrl(): Promise<string>;
}