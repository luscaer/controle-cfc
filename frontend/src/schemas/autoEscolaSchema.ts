import { z } from "zod";

export const AutoEscolaValidatorSchema = z.object({
  nome: z.string().min(2, "O nome deve ter ao menos dois caracteres"),
});

export type AutoEscolaFormData = z.infer<typeof AutoEscolaValidatorSchema>;
