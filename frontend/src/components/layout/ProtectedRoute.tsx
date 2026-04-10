import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import LogoIcon from "../../assets/logo.svg?react";

import { useAuth } from "../../context/AuthContext";
import { LoadingScreen } from "../ui/LoadingScreen";
import type { PerfilUsuario } from "../../types/perfil-usuario";

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles?: PerfilUsuario[];
}) => {
  const { usuario, isLoading } = useAuth();

  if (isLoading) {
    return (
      <LoadingScreen logo={<LogoIcon className="h-full w-full text-white" />} />
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles) {
    if (!allowedRoles.includes(usuario.perfilUsuario)) {
        return <Navigate to="/acesso-negado" replace />;
    }
  }

  return children;
};
