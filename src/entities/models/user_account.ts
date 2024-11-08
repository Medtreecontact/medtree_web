import { z } from "zod";

export const UserAccountSchema = z.object({
    id: z.string().optional(),
    uid: z.string().optional(),
    email: z.string().optional(),
    purchased: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    promo: z.string().nullable().optional(),
    university: z.string().nullable().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
});

export type UserAccount = z.infer<typeof UserAccountSchema>;