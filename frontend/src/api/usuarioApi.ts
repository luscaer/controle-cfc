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