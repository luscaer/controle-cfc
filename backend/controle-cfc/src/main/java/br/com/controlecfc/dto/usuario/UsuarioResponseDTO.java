package br.com.controlecfc.dto.usuario;

import java.util.UUID;

import br.com.controlecfc.domain.enums.PerfilUsuario;
import br.com.controlecfc.security.UsuarioPrincipal;

public record UsuarioResponseDTO(
    UUID id,
    String nome,
    String email,
    PerfilUsuario perfilUsuario,
    boolean ativo,
    UUID autoEscolaId
) {
    public static UsuarioResponseDTO fromPrincipal(UsuarioPrincipal principal) {
        return new UsuarioResponseDTO(
            principal.getId(),
            principal.getNome(),
            principal.getUsername(),
            principal.getPerfil(),
            principal.isEnabled(),
            principal.getAutoEscolaId()
        );
    }
}
