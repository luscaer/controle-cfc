import { z } from "zod";
import { CnpjSchema, EmailStringSchema, SenhaForteSchema, TelefoneSchema } from "./commonSchemas";

export const RegisterValidatorSchema = z
  .object({
    nomeAutoEscola: z
      .string()
      .min(2, "O nome deve ter ao menos dois caracteres"),
    cnpj: CnpjSchema,
    nomeUsuario: z.string().min(2, "O nome deve ter ao menos dois caracteres"),
    telefone: TelefoneSchema,
    email: EmailStringSchema,
    senha: SenhaForteSchema,
    confirmacaoSenha: z.string(),
    perfilUsuario: z.enum(
      ["ADMINISTRADOR", "INSTRUTOR"],
      "Selecione um perfil de acesso",
    ),
  })
  .refine((dados) => dados.senha === dados.confirmacaoSenha, {
    message: "As senhas não conferem",
    path: ["confirmacaoSenha"],
  });

export type RegisterFormData = z.infer<typeof RegisterValidatorSchema>;
