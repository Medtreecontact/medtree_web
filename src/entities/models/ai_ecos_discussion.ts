import { z } from "zod";

export const aiEcosDiscussionSchema = z.object({
    id: z.string(),
    userId: z.string(),
    date: z.date(),
    evaluation: z.array(z.string()),
    score: z.number(),
    stationId: z.string(),
    chatHistory: z.array(z.object({
        role: z.string(),
        text: z.string(),
    }),),
});

export type AiEcosDiscussion = z.infer<typeof aiEcosDiscussionSchema>;

