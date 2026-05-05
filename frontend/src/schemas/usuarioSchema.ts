import z from "zod";
import { TelefoneSchema } from "./commonSchemas";

export const UsuarioUpdateSchema = z.object({
  nome: z.string().min(2, "O nome deve ter ao menos dois caracteres"),
  telefone: TelefoneSchema,
});

export type UsuarioUpdateData = z.infer<typeof UsuarioUpdateSchema>;