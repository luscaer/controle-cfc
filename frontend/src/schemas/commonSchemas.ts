import { z } from "zod";
import { validarCnpj } from "../utils/validators";

export const EmailStringSchema = z.email("Formato de e-mail inválido");

export const EmailSchema = z.object({
  email: EmailStringSchema,
});

export const CnpjSchema = z
  .string()
  .transform((v) => v.replace(/\D/g, ""))
  .refine(validarCnpj, "CNPJ inválido");

export const TelefoneSchema = z
  .string()
  .transform((v) => v.replace(/\D/g, ""))
  .refine((v) => v.length >= 10 && v.length <= 11, "Telefone Inválido");

export const SenhaForteSchema = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres")
  .regex(/[A-Z]/, "A senha deve ter ao menos uma letra maiúscula")
  .regex(/[a-z]/, "A senha deve ter ao menos uma letra minúscula")
  .regex(/[0-9]/, "A senha deve ter ao menos um número")
  .regex(/[\W_]/, "A senha deve ter ao menos um caractere especial");
