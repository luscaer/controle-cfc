package br.com.controlecfc.dto.usuario;

import br.com.controlecfc.domain.enums.PerfilUsuario;

public record UsuarioResponseDTO(
    Long id,
    String nome,
    String email,
    PerfilUsuario perfilUsuario,
    boolean ativo,
    Long autoEscolaId
) {}
