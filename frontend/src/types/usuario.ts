export interface Usuario {
    id: string;
    nome: string;
    email: string;
    perfilUsuario: 'ADMINISTRADOR' | 'INSTRUTOR';
    ativo: boolean;
    autoEscolaId: string;
}