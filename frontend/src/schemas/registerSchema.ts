import { z } from "zod";
import { validarCnpj } from "../utils/validators";

const cnpjSchema = z.string().refine(validarCnpj, "CNPJ inválido");

export const RegisterValidatorSchema = z
  .object({
    nomeAutoEscola: z
      .string()
      .min(2, "O nome deve ter ao menos dois caracteres"),
    cnpj: cnpjSchema,
    nomeUsuario: z.string().min(2, "O nome deve ter ao menos dois caracteres"),
    email: z.email("Formato de e-mail inválido"),
    senha: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "A senha deve ter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve ter ao menos uma letra minúscula")
      .regex(/[0-9]/, "A senha deve ter ao menos um número")
      .regex(/[\W_]/, "A senha deve ter ao menos um caractere especial"),
    confirmacaoSenha: z.string(),
    perfilUsuario: z.enum(["ADMINISTRADOR", "INSTRUTOR"]),
  })
  .refine((dados) => dados.senha === dados.confirmacaoSenha, {
    message: "As senhas não conferem",
    path: ["confirmacaoSenha"],
  });

export type RegisterFormData = z.infer<typeof RegisterValidatorSchema>;
