import { z } from "zod/v4";
import { DoDThreatActorTiers } from "@/data";

export const AttributionThreatsSchema = z.object({
    DoDThreatTier: z.enum(Object.keys(DoDThreatActorTiers)).optional(),
    Custom: z.array(z.string()),
}).refine((data) => {
    return data.DoDThreatTier || data.Custom.length > 0;
}, {
    message: "At least one attribution threat must be specified."
})

export type AttributionThreats = z.infer<typeof AttributionThreatsSchema>;