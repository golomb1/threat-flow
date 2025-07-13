import { z } from "zod/v4";
import { v4 as uuid_v4 } from 'uuid';
import { SecurityParadigmMetadataSchema, type SecurityParadigmMetadata } from "@/data";
import { AttributionThreatsSchema, type AttributionThreats } from "@/data";
import { AssumptionSchema, type Assumption } from "@/data";
import { BusinessObjectiveSchema, type BusinessObjective } from "@/data";
import { SecurityGuidelinesSchema, type SecurityGuideline } from "@/data";
import { ControlObjectiveSchema, type ControlObjective } from "@/data";
import { ThreatSchema, type Threat } from "@/data";
import { ControlSchema, type Control } from "@/data";

export const SecurityParadigmSchema = z.object({
    id: z.string().nonempty(),
    name: z.string().nonempty(),
    metadata: SecurityParadigmMetadataSchema.nonoptional(),
    attributionThreats: AttributionThreatsSchema,
    assumptions: z.array(AssumptionSchema),
    businessObjectives: z.array(BusinessObjectiveSchema),    
    controlObjectives: z.array(ControlObjectiveSchema),
    securityGuidelines: z.array(SecurityGuidelinesSchema),
    threatCatalog: z.array(ThreatSchema),
    controlCatalog: z.array(ControlSchema),
});

export interface SecurityParadigm {
    id: string,
    name: string,
    metadata: SecurityParadigmMetadata,
    attributionThreats: AttributionThreats,
    assumptions: Assumption[],
    businessObjectives: BusinessObjective[],
    controlObjectives: ControlObjective[],
    securityGuidelines: SecurityGuideline[],
    threatCatalog: Threat[],
    controlCatalog: Control[],
}

export const createEmptySecurityParadigm = (): Partial<SecurityParadigm> => ({
    id: "P-" + uuid_v4(),
    assumptions: [],
    businessObjectives: [],
    controlObjectives: [],
    securityGuidelines: [],
    threatCatalog: [],
    controlCatalog: [],
});