import { z } from "zod/v4";
import { v4 as uuid_v4 } from 'uuid';
import { SystemComponentSchema } from "@/data";

export const SystemDataFlowSchema = z.object({
  id: z.string().nonempty(),
  name: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
  dataType: z.string().optional(),
  protocol: z.string().optional(),
  isEncrypted: z.boolean().optional(),
  relevantComponents: z.array(SystemComponentSchema),
});

export type SystemDataFlow = z.infer<typeof SystemDataFlowSchema>;

export const createEmptySystemDataFlow = (): Partial<SystemDataFlow> => ({
  id: "DF-" + uuid_v4(),
  tags: [],
  relevantComponents: [],
});