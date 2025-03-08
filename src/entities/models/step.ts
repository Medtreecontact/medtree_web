import { z } from "zod";

export const stepSchema = z.object({
    stepTitle: z.string(),
    id: z.string(),
    substepsIds: z.array(z.string()),
    stepAdvancement: z.number().optional(),
});

export type Step = z.infer<typeof stepSchema>;