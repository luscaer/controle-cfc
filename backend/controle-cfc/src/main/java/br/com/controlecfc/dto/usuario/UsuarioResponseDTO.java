package br.com.controlecfc.dto.usuario;

import java.util.UUID;

import br.com.controlecfc.domain.enums.PerfilUsuario;

public record UsuarioResponseDTO(
    UUID id,
    String nome,
    String email,
    PerfilUsuario perfilUsuario,
    boolean ativo,
    UUID autoEscolaId
) {}
