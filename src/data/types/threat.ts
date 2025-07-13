import { z } from "zod/v4";
import { v4 as uuid_v4 } from 'uuid';

export const ThreatSchema = z.object({
    id: z.string().nonempty(),
    name: z.string(),
    description: z.string(),
    assumptions: z.array(z.string()),
    preconditions: z.array(z.string()),
    attackVectors: z.array(z.string()),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    category: z.string(),
    relatedControlObjectives: z.array(z.string()),
    tags: z.array(z.string()),
    affectedComponents: z.array(z.string()).optional(),
    affectedDataFlows: z.array(z.string()).optional(),
    mitigatedByControls: z.array(z.string()).optional(),
});

export type Threat = z.infer<typeof ThreatSchema>;

export const createEmptyThreat = (): Partial<Threat> => ({
    id: "T-" + uuid_v4(),
    assumptions: [],
    preconditions: [],
    attackVectors: [],
    relatedControlObjectives: [],
    tags: [],
    affectedComponents: [],
    affectedDataFlows: [],
    mitigatedByControls : []
});