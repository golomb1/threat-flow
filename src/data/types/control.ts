import { z } from "zod/v4";
import { v4 as uuid_v4 } from 'uuid';
import { ThreatSchema } from "@/data";

export const ControlSchema = z.object({
    id: z.string().nonempty(),
    name: z.string(),
    description: z.string(),
    category: z.string(),
    type: z.enum(['preventive', 'detective', 'corrective', 'architectural']),
    priority: z.enum(['critical', 'high', 'medium', 'low']),
    implementationComplexity: z.enum(['low', 'medium', 'high']),
    relations: z.object({
        mitigatesThreats: z.array(z.string()),
        supportsControlObjectives: z.array(z.string()),
    }).refine((value) => {
        return value.mitigatesThreats.length > 0 || value.supportsControlObjectives.length > 0;
    }, {
        message: "At least one relation must be defined (mitigatesThreats or supportsControlObjectives).",
    }),
    implementationGuidelines: z.string().optional(),
    effectiveness: z.enum(['low', 'medium', 'high', 'best-effort']),
    remainingThreats: z.array(ThreatSchema),
    tags: z.array(z.string()),
    affectedComponentsType: z.array(z.string()),
    affectedDataflowsType: z.array(z.string()),
});

export type Control = z.infer<typeof ControlSchema>;

export const createEmptyControl = (): Partial<Control> => ({
    id: "C-" + uuid_v4(),
});