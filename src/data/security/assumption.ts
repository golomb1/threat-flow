import { z } from "zod/v4";

export const AssumptionSchema = z.object({
    id: z.string().nonempty(),
    name: z.string().nonempty(),
    description: z.string(),
    scope: z.array(z.string()),
});

export interface Assumption {
    id: string,
    name: string,
    description: string,
    scope: string[],
}