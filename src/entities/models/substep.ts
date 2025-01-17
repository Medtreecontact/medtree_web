import { z } from "zod";

export const substepSchema = z.object({
    subTitle: z.string(),
    id: z.string(),
    information: z.string(),
    category: z.string().nullable(),
    readSubstep: z.boolean().optional(),
});

export type Substep = z.infer<typeof substepSchema>;