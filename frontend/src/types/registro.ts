import type { AutoEscolaRequest } from "./autoescola-request";
import type { UsuarioRequest } from "./usuario-request";

export interface Registro {
    requestAutoEscola: AutoEscolaRequest;
    requestUsuario: UsuarioRequest;
}