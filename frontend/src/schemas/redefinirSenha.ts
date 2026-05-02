import { z } from "zod";

export const EsqueciSenhaSchema = z
  .object({
    email: z.email("Formato de e-mail inválido"),
  });

export type EsqueciSenhaFormData = z.infer<typeof EsqueciSenhaSchema>;

export const RedefinirSenhaSchema = z
  .object({
    senha: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "A senha deve ter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve ter ao menos uma letra minúscula")
      .regex(/[0-9]/, "A senha deve ter ao menos um número")
      .regex(/[\W_]/, "A senha deve ter ao menos um caractere especial"),
    confirmacaoSenha: z.string(),
  }).refine((dados) => dados.senha === dados.confirmacaoSenha, {
    message: "As senhas não conferem",
    path: ["confirmacaoSenha"],
  });

export type RedefinirSenhaFormData = z.infer<typeof RedefinirSenhaSchema>;