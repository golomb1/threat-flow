import { z } from "zod/v4";
import { v4 as uuid_v4 } from 'uuid';

export const ControlObjectiveCategories = ['Access Control', 'Data Protection', 'System Security', 'Network Security', 'Operational Security', 'Compliance']

export const ControlObjectiveType = [
    'preventive', 'soft', 'architectural'
];

export const ControlObjectivePriority = [
    'critical', 'high', 'medium', 'low'
];

export const ControlObjectiveSecurityGoal = [
    'Confidentiality', 'Integrity', 'Availability', 'Authenticity', 'Reputation', 'Non-Repudiation'
];

export const ControlObjectiveSchema = z.object({
    id: z.string().nonempty(),
    name: z.string().nonempty(),
    description: z.string(),
    type: z.enum(ControlObjectiveType),
    priority: z.enum(ControlObjectivePriority),
    scope: z.array(z.string()),
    relatedBusinessObjectives: z.array(z.string()),
    measurableOutcomes: z.array(z.string()),
    tags: z.array(z.string()),
    securityGoals: z.array(z.enum(ControlObjectiveSecurityGoal)),
});

export type ControlObjective = z.infer<typeof ControlObjectiveSchema>;

export const createEmptyControlObjective = (): ControlObjective => ({
    id: "O-" + uuid_v4(),
    name: '',
    description: '',
    type: '',
    priority: '',
    scope: [],
    relatedBusinessObjectives: [],
    measurableOutcomes: [],
    securityGoals: [],
    tags: [],
});