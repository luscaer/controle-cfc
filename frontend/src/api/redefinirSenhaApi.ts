import type { EsqueciSenhaFormData, RedefinirSenhaFormData } from "../schemas/redefinirSenha";
import { apiClient } from "./apiClient";

export const esqueciSenha = async (email: EsqueciSenhaFormData) => {
  await apiClient.post(`/auth/esqueci-senha`, email);
};

export const redefinirSenha = async (token: string, dados: RedefinirSenhaFormData) => {
  const payloadDoBackend = { token, senha: dados.senha};
  
  await apiClient.post(`/auth/redefinir-senha`, payloadDoBackend);
};