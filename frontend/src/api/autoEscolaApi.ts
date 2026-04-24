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
