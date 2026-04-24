import type { AutoEscolaFormData } from "../schemas/autoEscolaSchema";
import type { AutoEscolaResponse } from "../types/autoescola-response";
import type { PageResponse } from "../types/page";
import { apiClient } from "./apiClient";

export const buscarTodasAutoEscolas = async (
  page = 0,
  size = 10,
  busca = "",
): Promise<PageResponse<AutoEscolaResponse>> => {
  const response = await apiClient.get<PageResponse<AutoEscolaResponse>>(
    `/v1/auto-escolas?page=${page}&size=${size}&busca=${encodeURIComponent(busca)}`,
  );
  return response.data;
};

export const buscarAutoEscola = async (
  id: string,
): Promise<AutoEscolaResponse> => {
  const response = await apiClient.get<AutoEscolaResponse>(
    `/v1/auto-escolas/${id}`,
  );
  return response.data;
};

export const atualizarAutoEscola = async (
  id: string,
  dados: AutoEscolaFormData,
): Promise<AutoEscolaResponse> => {
  const response = await apiClient.put<AutoEscolaResponse>(
    `/v1/auto-escolas/${id}`,
    dados,
  );
  return response.data;
};

export const ativarAutoEscola = async (id: string) => {
  await apiClient.patch(`/v1/auto-escolas/${id}/ativar`);
};

export const desativarAutoEscola = async (id: string) => {
  await apiClient.patch(`/v1/auto-escolas/${id}/desativar`);
};
