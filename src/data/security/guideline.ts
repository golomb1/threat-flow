import { z } from "zod/v4";

export const SecurityGuidelineCategories = ['architecture', 'network-security', 'access-control', 'configuration-management', 'egress-security', 'monitoring']

export const SecurityGuidelinesSchema = z.object({
    id: z.string().nonempty(),
    name: z.string().nonempty(),
    description: z.string(),
    category: z.string().nonempty(),
    priority: z.enum(['critical', 'high', 'medium', 'low']),
    applicableScopes: z.array(z.string()),
    relatedControlObjectives: z.array(z.string()),
    implementationPrinciples: z.string(),
    tags: z.array(z.string()),
})

export type SecurityGuideline = z.infer<typeof SecurityGuidelinesSchema>;

export function createEmptyGuideline(): SecurityGuideline {
    return {
        id: '',
        name: '',
        description: '',
        category: '',
        priority: 'critical',
        applicableScopes: [],
        relatedControlObjectives: [],
        implementationPrinciples: '',
        tags: [],
    }
}