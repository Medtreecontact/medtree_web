import { z } from "zod";

export const coursesAdvancementSchema = z.object({
    userId: z.string(),
    examsAdvancement: z.record(z.string(), z.number()),
    stepsAdvancement: z.record(z.string(), z.number()),
    readSubsteps: z.array(z.string()),
    quizzesAdvancement: z.record(z.string(), z.number()),
    stationsAdvancement: z.array(z.object({
        soloDate: z.date(),
        multiDate: z.date(),
        soloScore: z.number(),
        multiScore: z.number(),
        stationId: z.string(),
    }),),
});

export type CoursesAdvancement = z.infer<typeof coursesAdvancementSchema>;

