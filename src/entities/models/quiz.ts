import { z } from "zod";
import { questionSchema } from "./question";

export const quizSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    difficulty: z.string(),
    duration: z.number(),
    lastUpdate: z.date(),
    questions: z.array(questionSchema).default([]),
    quizzAdvancement: z.number().optional(),
});

export type Quiz = z.infer<typeof quizSchema>;