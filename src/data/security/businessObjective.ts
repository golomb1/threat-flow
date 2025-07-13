import { z } from "zod/v4";
import { v4 as uuid_v4 } from 'uuid';

export const BusinessObjectiveSchema = z.object({
    id: z.string().nonempty(),
    name: z.string().nonempty(),
    description: z.string(),
    tags: z.array(z.string()),
    priority: z.enum(['critical', 'high', 'medium', 'low']).optional(),
})

export type BusinessObjective = z.infer<typeof BusinessObjectiveSchema>;

export function createEmptyBusinessObjective(): BusinessObjective {
    return {
        id: `BO-${uuid_v4()}`,
        name: '',
        description: '',
        priority: undefined,
        tags: []
    }
}