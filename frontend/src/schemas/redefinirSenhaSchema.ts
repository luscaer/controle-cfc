import { z } from "zod";
import { EmailSchema, SenhaForteSchema } from "./commonSchemas";

export const EsqueciSenhaSchema = EmailSchema;

export type EsqueciSenhaFormData = z.infer<typeof EsqueciSenhaSchema>;

export const RedefinirSenhaSchema = z
  .object({
    senha: SenhaForteSchema,
    confirmacaoSenha: z.string(),
  })
  .refine((dados) => dados.senha === dados.confirmacaoSenha, {
    message: "As senhas não conferem",
    path: ["confirmacaoSenha"],
  });

export type RedefinirSenhaFormData = z.infer<typeof RedefinirSenhaSchema>;
