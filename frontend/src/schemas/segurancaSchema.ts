import z from "zod";
import { EmailStringSchema, SenhaForteSchema } from "./commonSchemas";

export const AlterarEmailSchema = z
  .object({
    novoEmail: EmailStringSchema,
    confirmacaoEmail: EmailStringSchema,
    senhaAtual: z.string().min(1, "Senha atual é obrigatória")
  })
  .refine((dados) => dados.novoEmail === dados.confirmacaoEmail, {
    message: "Os e-mails não conferem",
    path: ["confirmacaoEmail"],
  });

export type AlterarEmailFormData = z.infer<typeof AlterarEmailSchema>;

export const AlterarSenhaSchema = z
  .object({
    novaSenha: SenhaForteSchema,
    confirmacaoSenha: z.string(),
    senhaAtual: z.string().min(1, "Senha atual é obrigatória"),
  })
  .refine((dados) => dados.novaSenha === dados.confirmacaoSenha, {
    message: "As senhas não conferem",
    path: ["confirmacaoSenha"],
  });

export type AlterarSenhaFormData = z.infer<typeof AlterarSenhaSchema>;
