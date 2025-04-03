import { IFirebaseRepository } from "@/domain/repositories/firebase_repository_interface";
import { CoursesAdvancement } from "@/entities/models/courses_advancement";
import { Exam } from "@/entities/models/exam";
import { MenuItem } from "@/entities/models/menu_item";
import { Step } from "@/entities/models/step";
import { Substep } from "@/entities/models/substep";
import { Synthese } from "@/entities/models/synthese";
import { UserAccount } from "@/entities/models/user_account";
import { DocumentReference } from "firebase-admin/firestore";
import { injectable, inject } from "inversify";
import { unstable_cache as cache } from "next/cache";
import "reflect-metadata";
import { FirebaseRepository } from "./firebase_repository";
import { Station } from "@/entities/models/station";
import { AiEcosDiscussion } from "@/entities/models/ai_ecos_discussion";

@injectable()
export class CachedFirebaseRepository implements IFirebaseRepository {
    constructor(
        @inject(FirebaseRepository) private repository: FirebaseRepository
    ) {}
    // Read operations with caching

    async getMenuItems(): Promise<MenuItem[]> {
        return cache(
            async () => await this.repository.getMenuItems(),
            ["getMenuItems"],
            {
                tags: ["menuItems"],
                revalidate: 60 * 60 * 24 // 2 hours
            }
        )();
    }

    async getExams(): Promise<Exam[]> {
        return cache(
            async () => await this.repository.getExams(),
            ["getExams"],
            {
                tags: ["exams"],
                revalidate: 60 * 60 * 24 // 2 hours
            }
        )();
    }

    async getSteps(): Promise<Step[]> {
        return cache(
            async () => await this.repository.getSteps(),
            ["getSteps"],
            {
                tags: ["steps"],
                revalidate: 60 * 60 * 24 // 2 hours
            }
        )();
    }

    async getSubsteps(): Promise<Substep[]> {
        return cache(
            async () => await this.repository.getSubsteps(),
            ["getSubsteps"],
            {
                tags: ["substeps"],
                revalidate: 60 * 60 * 24 // 2 hours
            }
        )();
    }

    async getSyntheses(): Promise<Synthese[]> {
        return cache(
            async () => await this.repository.getSyntheses(),
            ["getSyntheses"],
            {
                tags: ["syntheses"],
                revalidate: 60 * 60 * 24 // 2 hours
            }
        )();
    }

    async getStations(): Promise<Station[]> {
        return cache(
            async () => await this.repository.getStations(),
            ["getStations"],
            {
                tags: ["stations"],
                revalidate: 10 // 24 hours
            }
        )();
    }

    async getExamFromId(examId: string): Promise<Exam> {
        return cache(
            async (id: string) => await this.repository.getExamFromId(id),
            [`getExamFromId-${examId}`],
            {
                tags: ["exam", `exam-${examId}`],
                revalidate: 10 // 24 hours
            }
        )(examId);
    }

    async getSyntheseFromId(syntheseId: string): Promise<Synthese> {
        return cache(
            async (id: string) => await this.repository.getSyntheseFromId(id),
            [`getSyntheseFromId-${syntheseId}`],
            {
                tags: ["synthese", `synthese-${syntheseId}`],
                revalidate: 60 * 60 * 24 // 24 hours
            }
        )(syntheseId);
    }

    async getStepFromId(stepId: string): Promise<Step> {
        return cache(
            async (id: string) => await this.repository.getStepFromId(id),
            [`getStepFromId-${stepId}`],
            {
                tags: ["step", `step-${stepId}`],
                revalidate: 60 * 60 * 24 // 24 hours
            }
        )(stepId);
    }

    async getSubstepFromId(substepId: string): Promise<Substep> {
        return cache(
            async (id: string) => await this.repository.getSubstepFromId(id),
            [`getSubstepFromId-${substepId}`],
            {
                tags: ["substep", `substep-${substepId}`],
                revalidate: 60 * 60 * 24 // 24 hours
            }
        )(substepId);
    }

    async getQuizFromId(quizId: string): Promise<any> {
        return cache(
            async (id: string) => await this.repository.getQuizFromId(id),
            [`getQuizFromId-${quizId}`],
            {
                tags: ["quiz", `quiz-${quizId}`],
                revalidate: 10 // 24 hours
            }
        )(quizId);
    }

    async getStationFromId(stationId: string): Promise<Station> {
        return cache(
            async (id: string) => await this.repository.getStationFromId(id),
            [`getStationFromId-${stationId}`],
            {
                tags: ["station", `station-${stationId}`],
                revalidate: 10 // 24 hours
            }
        )(stationId);
    }

    async getAnalysisResultFromId(analysisId: string): Promise<AiEcosDiscussion> {
        return cache(
            async (id: string) => await this.repository.getAnalysisResultFromId(id),
            [`getAnalysisResultFromId-${analysisId}`],
            {
                tags: ["analysis", `analysis-${analysisId}`],
                revalidate: 10 // 24 hours
            }
        )(analysisId);
    }

    async getStepFromRef(stepRef: DocumentReference): Promise<Step> {
        return cache(
            async () => await this.repository.getStepFromRef(stepRef),
            [`getStepFromRef-${stepRef.path}`],
            {
                tags: ["step", `step-ref-${stepRef.id}`],
                revalidate: 60 * 60 * 24 // 24 hours
            }
        )();
    }

    async getSubstepFromRef(substepRef: DocumentReference): Promise<Substep> {
        return cache(
            async () => await this.repository.getSubstepFromRef(substepRef),
            [`getSubstepFromRef-${substepRef.path}`],
            {
                tags: ["substep", `substep-ref-${substepRef.id}`],
                revalidate: 60 * 60 * 24 // 24 hours
            }
        )();
    }

    async getSyntheseFromRef(syntheseRef: DocumentReference): Promise<Synthese> {
        return cache(
            async () => await this.repository.getSyntheseFromRef(syntheseRef),
            [`getSyntheseFromRef-${syntheseRef.path}`],
            {
                tags: ["synthese", `synthese-ref-${syntheseRef.id}`],
                revalidate: 60 * 60 * 24 // 24 hours
            }
        )();
    }
    
    async getUrlFromDocumentPath(path: string): Promise<string> {
        return cache(
            async (filePath: string) => await this.repository.getUrlFromDocumentPath(filePath),
            [`getUrlFromDocumentPath-${path}`],
            {
                tags: ["asset", `asset-${path}`],
                revalidate: 60 * 60 * 24 * 7 // 7 days (images rarely change)
            }
        )(path);
    }

    // Write operations and user-specific operations - NO caching
    async getUserAccount(uid: string): Promise<any> {
        return this.repository.getUserAccount(uid);
    }

    async createUserAccount(userAccount: UserAccount): Promise<any> {
        return this.repository.createUserAccount(userAccount);
    }

    async updateUserAccount(uid: string, updatedAccount: UserAccount): Promise<void> {
        return this.repository.updateUserAccount(uid, updatedAccount);
    }

    async uploadFile(path: string, file: File): Promise<void> {
        return this.repository.uploadFile(path, file);
    }

    async getUserCoursesAdvancement(userId: string): Promise<CoursesAdvancement> {
        return this.repository.getUserCoursesAdvancement(userId);
    }

    async updateUserAdvancement(userId: string, advancement: CoursesAdvancement): Promise<void> {
        return this.repository.updateUserAdvancement(userId, advancement);
    }

    async sendMessage(message: string, userId: string): Promise<void> {
        return this.repository.sendMessage(message, userId);
    }

    async requestAccountData(userId: string): Promise<void> {
        return this.repository.requestAccountData(userId);
    }

    async requestAccountDeletion(userId: string): Promise<void> {
        return this.repository.requestAccountDeletion(userId);
    }

    async updateCommunicationsPreferences(type: string, value: boolean, userId: string): Promise<void> {
        return this.repository.updateCommunicationsPreferences(type, value, userId);
    }

    async saveConsultationAnalysis(analysisResult: AiEcosDiscussion): Promise<string> {
        return this.repository.saveConsultationAnalysis(analysisResult);
    }
}