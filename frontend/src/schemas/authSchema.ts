import { z } from "zod";
import { EmailStringSchema } from "./commonSchemas";

export const LoginValidatorSchema = z.object({
  email: EmailStringSchema,
  senha: z.string().min(1, "A senha é obrigatória"),
});

export type LoginFormData = z.infer<typeof LoginValidatorSchema>;
