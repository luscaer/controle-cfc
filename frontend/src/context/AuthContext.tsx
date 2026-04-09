import { createContext, useEffect, useState, type ReactNode } from "react";
import { apiClient } from "../api/apiClient";

interface AuthContextParams {
    usuario: any | null;
    isLoading: boolean;
    login: (credentials: any) => Promise<void>;
    logout: () => void
}

const AuthContext = createContext<AuthContextParams | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const login = async (credentials: any) => {
        console.log("Tentou logar!");
    };
    const logout = () => {
        setUsuario(null);
    };

    useEffect(() => {
        const verificarAutenticacao = async () => {
            try {
                const response = await apiClient.get('/auth/me');
                setUsuario(response.data);
            } catch (error) {
                setUsuario(null);
            } finally {
                setIsLoading(false);
            }
        };
        verificarAutenticacao();
    }, []);

    const isAuthenticaded = usuario !== null; // (Isso é um ternário?)

    return (
        <AuthContext.Provider value={{
            usuario,
            isLoading,
            login,
            logout

        }}>
            {children}
        </AuthContext.Provider>
    )
}