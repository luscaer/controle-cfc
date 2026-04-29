import type { UsuarioResumedResponse } from "../types/usuario-response";
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