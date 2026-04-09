import { createContext, useState, type ReactNode } from "react";

interface AuthContextParams {
    token: string;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextParams | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string>(() => {
        return localStorage.getItem('token');
    });
}