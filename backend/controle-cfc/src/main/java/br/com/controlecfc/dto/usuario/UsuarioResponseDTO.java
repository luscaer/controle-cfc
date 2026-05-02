package br.com.controlecfc.dto.usuario;

import java.time.LocalDateTime;
import java.util.UUID;

import br.com.controlecfc.domain.entity.Usuario;
import br.com.controlecfc.domain.enums.PerfilUsuario;

public record UsuarioResponseDTO(
        UUID id,
        String nome,
        String email,
        String telefone,
        PerfilUsuario perfilUsuario,
        boolean ativo,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        String usuarioCriador,
        String usuarioModificador,
        UUID autoEscolaId) {
    public static UsuarioResponseDTO fromEntity(Usuario usuario) {
        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getTelefone(),
                usuario.getPerfilUsuario(),
                usuario.isAtivo(),
                usuario.getDataCriacao(),
                usuario.getDataAtualizacao(),
                usuario.getUsuarioCriador(),
                usuario.getUsuarioModificador(),
                usuario.getAutoEscola().getId());
    }
}
