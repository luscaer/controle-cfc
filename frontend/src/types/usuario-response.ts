import type { PerfilUsuario } from "./perfil-usuario";

export interface UsuarioResponse {
  id: string;
  nome: string;
  email: string;
  perfilUsuario: PerfilUsuario;
  ativo: boolean;
  autoEscolaId: string;
}
