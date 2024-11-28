import type { DocumentReference } from "firebase-admin/firestore";
import { z } from "zod";

export const menuItemSchema = z.object({
    access: z.string(),
    examRef: z.custom<DocumentReference>(),
    iconPath: z.string(),
    id: z.string(),
    priority: z.number(),
    title: z.string(),
    update: z.date(),
});

export type MenuItem = z.infer<typeof menuItemSchema>;