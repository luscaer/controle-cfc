import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import LogoIcon from "../../assets/logo.svg?react";

import { useAuth } from "../../context/AuthContext";
import { LoadingScreen } from "../ui/LoadingScreen";

export const ProtectedRoute = ({ children }: { children : JSX.Element}) => {
    const { usuario, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingScreen 
            logo={<LogoIcon className="h-full w-full text-white" />}
        />;
    }

    if(!usuario) {
        return <Navigate to="/login" replace />;
    }

    return children;
}