import type { DocumentReference } from "firebase-admin/firestore";
import { z } from "zod";

export const stepSchema = z.object({
    stepTitle: z.string(),
    id: z.string(),
    substepsRef: z.array(z.custom<DocumentReference>()),
    stepAdvancement: z.number().optional(),
});

export type Step = z.infer<typeof stepSchema>;