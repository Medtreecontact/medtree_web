import { IFirebaseRepository } from "@/domain/repositories/firebase_repository_interface";
import { database, storage } from '@/infrastructure/services/firebase_service';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { DatabaseError } from "@/entities/errors/database";

import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class FirebaseReposiory implements IFirebaseRepository {
    async getMenuItems() : Promise<any[]> {
        try {
            const querySnapshort = await getDocs(collection(database, 'menu'));
            const menuItems = querySnapshort.docs.map(doc => doc.data());
            return menuItems;
        } catch (error) {
            throw new DatabaseError('Failed to fetch menu items');
        }
    }

    async getFirstAssetImageUrl(): Promise<string> {
        try {
            const querySnapshort = await getDocs(collection(database, 'assets'));
            const doc = querySnapshort.docs[0];
            const path = doc.data().path;

            const storageRef = ref(storage, path);
            const url = await getDownloadURL(storageRef);
            return url;
        } catch (error) {
            throw new DatabaseError('Failed to fetch asset image');
        }
    }
}