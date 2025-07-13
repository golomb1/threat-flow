import { z } from "zod/v4";
import { v4 as uuid_v4 } from 'uuid';
import { SystemComponentSchema } from "@/data";
import { SystemDataFlowSchema } from "@/data";
import { SecurityParadigmSchema } from "@/data";

export const SystemProfileSchema = z.object({
    id: z.string().nonempty(),
    name: z.string(),
    version: z.string().regex(/^\d+\.\d+\.\d+$/, "Expected format: 'd.d.d'"),
    description: z.string(),
    diagram: z.string(),
    architectureDescription: z.string(),
    tags: z.array(z.string()),
    components: z.array(SystemComponentSchema),
    dataFlows: z.array(SystemDataFlowSchema),
    securityParadigm: SecurityParadigmSchema,
});

export type SystemProfile = z.infer<typeof SystemProfileSchema>;

export const createEmptySystemProfile = (): Partial<SystemProfile> => ({
    id: "SP-" + uuid_v4(),
    tags: [],
    components: [],
    dataFlows: [],
});