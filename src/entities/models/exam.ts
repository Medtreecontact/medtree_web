import { z } from "zod";

export const examSchema = z.object({
    examTitle: z.string(),
    id: z.string(),
    stepsIds: z.array(z.string()),
    synthesesIds: z.array(z.string()),
    quizzesIds: z.array(z.string()),
});

export type Exam = z.infer<typeof examSchema>;