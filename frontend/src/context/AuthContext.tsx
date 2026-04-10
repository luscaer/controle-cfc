import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { apiClient } from "../api/apiClient";
import type { Usuario } from "../types/usuario";
import type { LoginCredentials } from "../types/auth";

interface AuthContextParams {
  usuario: Usuario | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextParams | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
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
        console.log("Erro no login: ", error);
        alert("E-mail ou senha inválidos!");
        return false;
    }
  };

  const logout = () => {
    setUsuario(null);
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

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");

  return context;
};
