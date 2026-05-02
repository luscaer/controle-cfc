import type { RegisterFormData } from "../schemas/registerSchema";
import { apiClient } from "./apiClient";

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
