import type { PerfisCriacao } from "./perfil-usuario";

export interface UsuarioRequest {
    nome: string;
    email: string;
    senha: string;
    perfilUsuario: PerfisCriacao;
}