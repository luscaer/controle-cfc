import type { ConviteFormData } from "../schemas/conviteSchema";
import type { RegisterFormData } from "../schemas/registerSchema";
import { apiClient } from "./apiClient";

export const conviteRegistro = async (dados: ConviteFormData) => {
    await apiClient.post(`/v1/registro/convidar?email=${dados.email}`);
}

export const validarTokenEmail = async (token: string): Promise<string> => {
    const response = await apiClient.get<{email: string}>(`/v1/registro/validar-token?token=${token}`);
    return response.data.email;
}

export const registroInicial = async (dados: RegisterFormData, token: String) => {
  const payloadDoBackend = {
    requestAutoEscola: {
      nome: dados.nomeAutoEscola,
      cnpj: dados.cnpj,
    },
    requestUsuario: {
      nome: dados.nomeUsuario,
      email: dados.email,
      telefone: dados.telefone,
      senha: dados.senha,
      perfilUsuario: dados.perfilUsuario,
    },
  };

  await apiClient.post(`/v1/registro/inicial?token=${token}`, payloadDoBackend);
}

export const superRegistroInicial = async (dados: RegisterFormData) => {
  const payloadDoBackend = {
    requestAutoEscola: {
      nome: dados.nomeAutoEscola,
      cnpj: dados.cnpj,
    },
    requestUsuario: {
      nome: dados.nomeUsuario,
      email: dados.email,
      telefone: dados.telefone,
      senha: dados.senha,
      perfilUsuario: dados.perfilUsuario,
    },
  };

  await apiClient.post("/v1/registro/super", payloadDoBackend);
};
