import { z } from "zod/v4";

export const SecurityParadigmMetadataSchema = z.object({
    version: z.string().regex(/^\d+\.\d+$/, "Expected format: 'd.d'"),
    lastUpdated: z.iso.datetime({ offset: true }),
    description: z.string().optional(),
})

export type SecurityParadigmMetadata = z.infer<typeof SecurityParadigmMetadataSchema>;