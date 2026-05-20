import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { UsuarioResponse } from "../types/usuario-response";
import { authMe, authLogin, authLogout } from "../api/authApi";
import type { LoginFormData } from "../schemas/authSchema";
import type { UsuarioUpdateData } from "../schemas/usuarioSchema";
import { atualizarMeuUsuario } from "../api/usuarioApi";

interface AuthContextParams {
  usuario: UsuarioResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginFormData) => Promise<boolean>;
  logout: () => Promise<boolean>;
  updateMyUser: (usuario: UsuarioUpdateData) => Promise<void>;
}

const AuthContext = createContext<AuthContextParams | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      try {
        setUsuario(await authMe());
      } catch {
        setUsuario(null);
      } finally {
        setIsLoading(false);
      }
    };
    verificarAutenticacao();
  }, []);

  const login = async (credenciais: LoginFormData) => {
    setUsuario(await authLogin(credenciais));
    return true;
  };

  const logout = async () => {
    try {
      await authLogout();
      setUsuario(null);
      return true;
    } catch {
      return false;
    }
  };

  const updateMyUser = async (usuario: UsuarioUpdateData) => {
    setUsuario(await atualizarMeuUsuario(usuario));
  };

  const isAuthenticated = usuario !== null;

  const value = {
    usuario,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateMyUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}
