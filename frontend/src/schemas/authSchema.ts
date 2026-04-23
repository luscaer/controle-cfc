import { z } from "zod";

export const LoginValidatorSchema = z.object({
  email: z.email("Formato de e-mail inválido"),
  senha: z.string().min(1, "A senha é obrigatória"),
});

export type LoginFormData = z.infer<typeof LoginValidatorSchema>;
