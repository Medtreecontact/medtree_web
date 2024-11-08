import { z } from "zod";

export const menuItemsSchema = z.object({
    access: z.string(),
    examRef: z.string(),
    iconPath: z.string(),
    id: z.string(),
    priority: z.number(),
    title: z.string(),
    update: z.date(),
});

export type MenuItems = z.infer<typeof menuItemsSchema>;