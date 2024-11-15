import type { DocumentReference } from "firebase-admin/firestore";
import { z } from "zod";

export const examSchema = z.object({
    examTitle: z.string(),
    id: z.string(),
    stepsRef: z.array(z.custom<DocumentReference>()),
    synthesesRef: z.array(z.custom<DocumentReference>()),
});

export type Exam = z.infer<typeof examSchema>;