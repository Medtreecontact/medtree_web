import { z } from "zod";

export const questionSchema = z.object({
    id: z.string(),
    title: z.string(),
    correctAnswers: z.array(z.string()),
    wrongAnswers: z.array(z.string()),
    explanation: z.string(),
});

export type Question = z.infer<typeof questionSchema>;