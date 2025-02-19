import { IFirebaseRepository } from "@/domain/repositories/firebase_repository_interface";
import { DatabaseError } from "@/entities/errors/database";
import { CoursesAdvancement } from "@/entities/models/courses_advancement";
import { Exam } from "@/entities/models/exam";
import { MenuItem } from "@/entities/models/menu_item";
import { Step } from "@/entities/models/step";
import { Substep } from "@/entities/models/substep";
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
                synthesesRef: exam.syntheses ? exam.syntheses : [],
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
                duration: synthese.duration,
            } as Synthese;
        } catch (error) {
            throw new DatabaseError('Failed to fetch synthese ' + error);
        }
    }

    async getStepFromId(stepId: string): Promise<Step> {
        try {
            const firebaseStep = await db.collection('steps').doc(stepId).get();
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

    async getSubstepFromId(substepId: string): Promise<Substep> {
        try {
            const firebaseSubstep = await db.collection('substeps').doc(substepId).get();
            const substep = firebaseSubstep.data();
            if (!substep) {
                throw new Error('Substep not found');
            }
            return {
                subTitle: substep.subTitle,
                id: substep.id,
                information: substep.information,
                category: substep.update ?? null,
            };
        } catch (error) {
            throw new DatabaseError('Failed to fetch substep ' + error);
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

    async getSubstepFromRef(substepRef: DocumentReference): Promise<Substep> {
        try {
            const firebaseSubstep = await db.doc(substepRef.path).get();
            const substep = firebaseSubstep.data();
            if (!substep) {
                throw new Error('Substep not found');
            }
            return {
                subTitle: substep.subTitle,
                id: substep.id,
                information: substep.information,
                category: substep.update ?? null,
            };
        } catch (error) {
            throw new DatabaseError('Failed to fetch substep ' + error);
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
                duration: synthese.duration,
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
    
    async getMenuItems() : Promise<MenuItem[]> {
        try {
            const querySnapshot = await db.collection('menu').get();
            const menuItems = querySnapshot.docs.map(doc => {
                const data = doc.data()
                return {
                    access: data.access,
                    examRef: data.examRef,
                    iconPath: data.iconPath,
                    id: data.id,
                    priority: data.priority,
                    title: data.title,
                    update: data.update,
                  } as MenuItem;
            });
            return menuItems;
        } catch (error) {
            throw new DatabaseError('Failed to fetch menu items ' + error);
        }
    }

    async getUrlFromDocumentPath(path: string): Promise<string> {
        try {
            const file = storage.bucket().file(path);
            const url = await getDownloadURL(file);
            return url;
        } catch (error) {
            throw new DatabaseError('Failed to fetch asset ' + error);
        }
    }

    async uploadFile(path: string, file: File): Promise<void> {
        try {
            const bucket = storage.bucket();
            const fileRef = bucket.file(path);
            const buffer = Buffer.from(await file.arrayBuffer());
            await fileRef.save(buffer);
        } catch (error) {
            throw new DatabaseError('Failed to upload file ' + error);
        }
    }

    async createUserCoursesAdvancement(userId: string): Promise<void> {
        try {
            const docRef = db.collection('users_courses_advancement').doc();
            const advancement = {
                userId: userId,
                readSubsteps: [],
                examsAdvancement: {},
                stepsAdvancement: {},
            };
            await docRef.set(advancement);
        } catch (error) {
            throw new DatabaseError('Failed to create user advancement ' + error);
        }
    }

    async getUserCoursesAdvancement(userId: string): Promise<CoursesAdvancement> {
        let querySnapshot = await db.collection('users_courses_advancement').where('userId', '==', userId).get();
        if (querySnapshot.docs.length == 0) {
            await this.createUserCoursesAdvancement(userId);
            querySnapshot = await db.collection('users_courses_advancement').where('userId', '==', userId).get();
            if (querySnapshot.docs.length == 0) throw new Error('User advancement not found');
        }
        const advancement = querySnapshot.docs[0].data();
        return {
            userId: advancement.userId,
            readSubsteps: advancement.readSubsteps,
            examsAdvancement: advancement.examsAdvancement,
            stepsAdvancement: advancement.stepsAdvancement,
        } as CoursesAdvancement;
    }

    async updateUserAdvancement(userId: string, advancement: CoursesAdvancement): Promise<void> {
        try {
            const querySnapshot = await db.collection('users_courses_advancement').where('userId', '==', userId).get();
            const doc = querySnapshot.docs[0];
            await doc.ref.update(advancement);
        } catch (error) {
            throw new DatabaseError('Failed to update user advancement ' + error);
        }
    }

    async sendMessage(message: string, userId: string): Promise<void> {
        try {
            const docRef = db.collection('feedbacks').doc();
            const messageData = {
                message: message,
                date: new Date(),
                userId: userId,
            };
            await docRef.set(messageData);
        } catch (error) {
            throw new DatabaseError('Failed to send message ' + error);
        }
    }

    async requestAccountData(userId: string): Promise<void> {
        try {
            const docRef = db.collection('account_data_requests').doc();
            const requestData = {
                userId: userId,
                date: new Date(),
                answered: false,
            };
            await docRef.set(requestData);
        } catch (error) {
            throw new DatabaseError('Failed to request account data ' + error);
        }
    }

    async requestAccountDeletion(userId: string): Promise<void> {
        try {
            const docRef = db.collection('account_deletion_requests').doc();
            const requestData = {
                userId: userId,
                date: new Date(),
                answered: false,
            };
            await docRef.set(requestData);
        } catch (error) {
            throw new DatabaseError('Failed to request account deletion ' + error);
        }
    }

    async updateCommunicationsPreferences(type: string, value: boolean, userId: string): Promise<void> {
        try {
            const querySnapshot = await db.collection('medtree_app_users').where('uid', '==', userId).get();
            const doc = querySnapshot.docs[0];
            await doc.ref.update({ [type]: value });
        } catch (error) {
            throw new DatabaseError('Failed to update communications preferences ' + error);
        }
    }
}