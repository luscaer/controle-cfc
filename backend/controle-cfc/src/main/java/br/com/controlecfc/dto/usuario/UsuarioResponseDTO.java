package br.com.controlecfc.dto.usuario;

import java.time.LocalDateTime;
import java.util.UUID;

import br.com.controlecfc.domain.entity.Usuario;
import br.com.controlecfc.domain.enums.PerfilUsuario;

public record UsuarioResponseDTO(
    UUID id,
    String nome,
    String email,
    PerfilUsuario perfilUsuario,
    boolean ativo,
    LocalDateTime dataCriacao,
    LocalDateTime dataAtualizacao,
    UUID autoEscolaId
) {
    public static UsuarioResponseDTO fromEntity(Usuario usuario) {
        return new UsuarioResponseDTO(
            usuario.getId(),
            usuario.getNome(),
            usuario.getEmail(),
            usuario.getPerfilUsuario(),
            usuario.isAtivo(),
            usuario.getDataCriacao(),
            usuario.getDataAtualizacao(),
            usuario.getAutoEscola().getId()
        );
    }
}
