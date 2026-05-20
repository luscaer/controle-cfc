import type { AlterarEmailFormData, AlterarSenhaFormData } from "../schemas/segurancaSchema";
import type { UsuarioUpdateData } from "../schemas/usuarioSchema";
import type { UsuarioResponse, UsuarioResumedResponse } from "../types/usuario-response";
import { apiClient } from "./apiClient";

export const buscarUsuariosPelaAutoEscolaEPeloPerfil = async (
  id: string,
  perfil: string
): Promise<UsuarioResumedResponse[]> => {
  const response = await apiClient.get<UsuarioResumedResponse[]>(
    `/v1/usuarios/auto-escola/${id}?perfil=${perfil}`,
  );
  return response.data;
};

export const atualizarMeuUsuario = async (usuario: UsuarioUpdateData): Promise<UsuarioResponse> => {
    const response  = await apiClient.put<UsuarioResponse>(
        `/v1/usuarios/me`, usuario
    );
    return response.data;
}

export const atualizarMeuEmail = async (dados: AlterarEmailFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmacaoEmail, ...dadosParaAPI } = dados;
    await apiClient.put("/v1/usuarios/atualizar-email", dadosParaAPI);
}

export const atualizarMinhaSenha = async (dados: AlterarSenhaFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmacaoSenha, ...dadosParaAPI } = dados;
    await apiClient.put("/v1/usuarios/atualizar-senha", dadosParaAPI);
}