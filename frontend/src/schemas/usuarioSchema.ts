import z from "zod";

const telefoneSchema = z
  .string()
  .transform((v) => v.replace(/\D/g, ""))
  .refine((v) => v.length >= 10 && v.length <= 11, "Telefone Inválido");

export const UsuarioUpdateSchema = z.object({
  nome: z.string().min(2, "O nome deve ter ao menos dois caracteres"),
  telefone: telefoneSchema,
});

export type UsuarioUpdateData = z.infer<typeof UsuarioUpdateSchema>;