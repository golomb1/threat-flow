import { z } from "zod/v4";
import { v4 as uuid_v4 } from 'uuid';

export const TrustLevel = ['Trusted', 'Semi-Trusted', 'Untrusted'];

export const SystemComponentSchema = z.object({
    id: z.string().nonempty(),
    name: z.string(),
    type: z.string(),
    version: z.string().regex(/^\d+\.\d+\.\d+$/, "Expected format: 'd.d.d'"),
    tags: z.array(z.string()),
    description: z.string(),
    trustLevel: z.enum(TrustLevel).optional(),
});

export type SystemComponent = z.infer<typeof SystemComponentSchema>;

export const createEmptySystemComponent = (): Partial<SystemComponent> => ({
    id: "SC-" + uuid_v4(),
    tags: [],
});