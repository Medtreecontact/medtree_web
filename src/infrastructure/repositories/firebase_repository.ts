import { IFirebaseRepository } from "@/domain/repositories/firebase_repository_interface";
import { DatabaseError } from "@/entities/errors/database";
import { Exam } from "@/entities/models/exam";
import { Step } from "@/entities/models/step";
import { Synthese } from "@/entities/models/synthese";
import { UserAccount } from "@/entities/models/user_account";

import { db, storage } from "@/infrastructure/services/firebase-server";
import { DocumentReference } from "firebase-admin/firestore";
import { getDownloadURL } from 'firebase-admin/storage';

import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class FirebaseRepository implements IFirebaseRepository {
    async getExamFromId(examId: string): Promise<Exam> {
        try {
            const firebaseExam = await db.collection('exams').doc(examId).get();
            const exam = firebaseExam.data();
            if (!exam) {
                throw new Error('Exam not found');
            }
            return { examTitle: exam.examTitle,
                id: exam.id,
                stepsRef: exam.steps,
                synthesesRef: exam.syntheses
            } as Exam;
        } catch (error) {
            throw new DatabaseError('Failed to fetch exam ' + error);
        }
    }

    async getSyntheseFromId(syntheseId: string): Promise<Synthese> {
        try {
            const firebaseSynthese = await db.collection('fiches_syntheses').doc(syntheseId).get();
            const synthese = firebaseSynthese.data();
            if (!synthese) {
                throw new Error('Synthese not found');
            }
            return {
                title: synthese.title,
                id: synthese.id,
                content: synthese.content,
                update: synthese.update,
            } as Synthese;
        } catch (error) {
            throw new DatabaseError('Failed to fetch synthese ' + error);
        }
    }

    async getStepFromRef(stepRef: DocumentReference): Promise<Step> {
        try {
            const firebaseStep = await db.doc(stepRef.path).get();
            const step = firebaseStep.data();
            if (!step) {
                throw new Error('Step not found');
            }
            return { stepTitle: step.stepTitle,
                id: step.id,
                substepsRef: step.substeps
            } as Step;
        } catch (error) {
            throw new DatabaseError('Failed to fetch step ' + error);
        }
    }

    async getSyntheseFromRef(syntheseRef: DocumentReference): Promise<Synthese> {
        try {
            const firebaseSynthese = await db.doc(syntheseRef.path).get();
            const synthese = firebaseSynthese.data();
            if (!synthese) {
                throw new Error('Synthese not found');
            }
            return {
                title: synthese.title,
                id: synthese.id,
                content: synthese.content,
                update: synthese.update,
            } as Synthese;
        } catch (error) {
            throw new DatabaseError('Failed to fetch synthese ' + error);
        }
    }

    async getUserAccount(uid :string): Promise<any> {
        const querySnapshot = await db.collection('medtree_app_users').where('uid', '==', uid).get();
        if (querySnapshot.docs.length == 0) {
            throw new Error('User not found');
        }
        const user = querySnapshot.docs[0].data();
        return user;
    }

    async createUserAccount(userAccount: UserAccount): Promise<any> {
        try {
            const docRef = db.collection('medtree_app_users').doc();
            const user = {
                id: docRef.id,
                uid: userAccount.uid,
                email: userAccount.email || null,
                purchased: userAccount.purchased || false,
                emailVerified: userAccount.emailVerified ||false,
                promo: userAccount.promo || null,
                university: userAccount.university || null,
                firstName: userAccount.firstName || null,
                lastName: userAccount.lastName || null,
            };
            await docRef.set(user);
            return user;
        } catch (error) {
            throw new DatabaseError('Failed to create user account ' + error);
        }
    }

    async updateUserAccount(uid: string, updatedAccount: UserAccount): Promise<void> {
        try {
            const querySnapshot = await db.collection('medtree_app_users').where('uid', '==', uid).get();
            const doc = querySnapshot.docs[0];
            await doc.ref.update(updatedAccount);
        } catch (error) {
            throw new DatabaseError('Failed to update user account ' + error);
        }
    }
    
    async getMenuItems() : Promise<any[]> {
        try {
            const querySnapshot = await db.collection('menu').get();
            const menuItems = querySnapshot.docs.map(doc => doc.data());
            return menuItems;
        } catch (error) {
            throw new DatabaseError('Failed to fetch menu items ' + error);
        }
    }

    async getFirstAssetImageUrl(): Promise<string> {
        try {
            const querySnapshort = await db.collection('assets').get();
            const doc = querySnapshort.docs[0];
            const path = doc.data().path;
            const file = storage.bucket().file(path);
            const url = await getDownloadURL(file);
            return url;
        } catch (error) {
            throw new DatabaseError('Failed to fetch asset image ' + error);
        }
    }
}