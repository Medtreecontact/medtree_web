import { z } from "zod";

export const stationSchema = z.object({
    id: z.string(),
    access: z.enum(["free", "purchased"]),
    title: z.string(),
    sddNumber: z.string(),
    tags: z.array(z.string()),
    lastUpdate: z.date(),
    doctorSheet: z.object({
        goals: z.string(),
        patientInformation: z.string(),
        situationPresentation: z.string()
    }),
    patientSheet: z.object({
        answers: z.record(z.string()),
        patientPresentation: z.string(),
        startingSentence: z.string(),
    }),
    gradingSheet: z.object({
        keyPoints: z.array(
            z.object({
                keyPoint: z.string(),
                subKeyPoints: z.array(z.string()).optional()
            })
        ),
    }),
    annexes: z.array(z.record(z.string())),
    lastResult: z.object({
        soloDate: z.date(),
        multiDate: z.date(),
        soloScore: z.number(),
        multiScore: z.number(),
    }),
});

export type Station = z.infer<typeof stationSchema>;