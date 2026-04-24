import type { LoginCredentials } from "../types/auth";
import type { UsuarioResponse } from "../types/usuario-response";
import { apiClient } from "./apiClient";

export const authMe = async (): Promise<UsuarioResponse> => {
  const response = await apiClient.get<UsuarioResponse>("/auth/me");
  return response.data;
};

export const authLogin = async (credenciais: LoginCredentials): Promise<UsuarioResponse> => {
  const response = await apiClient.post<UsuarioResponse>("/auth/login", credenciais);
  return response.data;
};

export const authLogout = async () => {
  await apiClient.post("/auth/logout");
};
