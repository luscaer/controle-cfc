export interface UsuarioRequest {
    nome: string;
    email: string;
    senha: string;
    perfilUsuario: 'ADMINISTRADOR' | 'INSTRUTOR';
}