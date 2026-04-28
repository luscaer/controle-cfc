import type { PerfilUsuario } from "./perfil-usuario";

export interface UsuarioResponse {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  perfilUsuario: PerfilUsuario;
  ativo: boolean;
  dataCriacao: string;
  dataAtualizacao: string;
  usuarioCriador: string;
  usuarioModificador: string;
  autoEscolaId: string;
}
