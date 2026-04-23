import type { AutoEscolaResponse } from "../types/autoescola-response";
import { apiClient } from "./apiClient";

export const buscarTodasAutoEscolas = async ():
  Promise<AutoEscolaResponse[]> => {
    const response = await apiClient.get<AutoEscolaResponse[]>("/v1/auto-escolas");
    return response.data;
  };
