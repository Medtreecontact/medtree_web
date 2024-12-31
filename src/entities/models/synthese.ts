import { z } from "zod";

export const syntheseSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    duration: z.number(),
    update: z.date(),
});

export type Synthese = z.infer<typeof syntheseSchema>;