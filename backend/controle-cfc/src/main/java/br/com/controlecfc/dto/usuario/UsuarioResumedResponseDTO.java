package br.com.controlecfc.dto.usuario;

import java.util.UUID;

import br.com.controlecfc.domain.entity.Usuario;

public record UsuarioResumedResponseDTO(
        UUID id,
        String nome,
        String email,
        String telefone,
        boolean ativo
        ) {
    public static UsuarioResumedResponseDTO fromEntity(Usuario usuario) {
        return new UsuarioResumedResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getTelefone(),
                usuario.isAtivo());
    }
}
