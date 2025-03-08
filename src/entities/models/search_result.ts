import { z } from "zod";
import { syntheseSchema } from "./synthese";
import { stepSchema } from "./step";
import { substepSchema } from "./substep";

export const searchResultSchema = z.object({
    access: z.string(),
    examId: z.string(),
    iconPath: z.string(),
    id: z.string(),
    stepsResults: z.array(stepSchema),
    substepsResults: z.array(substepSchema),
    syntheseResults: z.array(syntheseSchema),
    quizzResults: z.array(z.string()),
    title: z.string(),
    resultCount: z.number()
});

export type SearchResult = z.infer<typeof searchResultSchema>;