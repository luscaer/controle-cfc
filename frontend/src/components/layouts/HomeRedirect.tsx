import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function HomeRedirect() {
  const { usuario } = useAuth();
  if (!usuario) return null;

  const perfilUsuario = usuario.perfilUsuario;

  switch (perfilUsuario) {
    case "SUPER_ADMIN":
      return <Navigate to={"/auto-escolas"} replace />;
    case "ADMINISTRADOR":
      return <Navigate to={"/usuarios"} replace />;
    case "INSTRUTOR":
      return <Navigate to={"/aulas"} replace />;
    default:
      break;
  }

  return <Navigate to={"/acesso-negado"} replace />;
}
