import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { apiClient } from "../api/apiClient";
import type { UsuarioResponse } from "../types/usuario-response";
import type { LoginCredentials } from "../types/auth";

interface AuthContextParams {
  usuario: UsuarioResponse | null;
  isLoading: boolean;
  isAuthenticaded: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextParams | null>(null);

export function AuthProvider ({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      try {
        const response = await apiClient.get("/auth/me");
        setUsuario(response.data);
      } catch (error) {
        setUsuario(null);
      } finally {
        setIsLoading(false);
      }
    };
    verificarAutenticacao();
  }, []);

  const login = async (credenciais: LoginCredentials) => {
    try {
        const response = await apiClient.post('/auth/login', credenciais);
        setUsuario(response.data);
        return true;
    } catch (error) {
        return false;
    }
  };

  const logout = async () => {
    try {
        await apiClient.post('/auth/logout');
        setUsuario(null);
        return true;
    } catch (error) {
        return false;
    }
  };

  const isAuthenticaded = usuario !== null;

  const value = {
    usuario,
    isLoading,
    isAuthenticaded,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth () {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
