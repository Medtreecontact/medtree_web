import { z } from "zod";

export const menuItemSchema = z.object({
    access: z.string(),
    examId: z.string(),
    iconPath: z.string(),
    id: z.string(),
    priority: z.number(),
    stepCount: z.number().optional(),
    synthesesCount: z.number().optional(),
    quizzesCount: z.number().optional(),
    title: z.string(),
    update: z.date(),
    examAdvancement: z.number().optional(),
});

export type MenuItem = z.infer<typeof menuItemSchema>;