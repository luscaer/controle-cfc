package br.com.controlecfc.security.dto;

import br.com.controlecfc.dto.usuario.UsuarioResponseDTO;

public record LoginResponseDTO(
    String token,
    UsuarioResponseDTO usuario
) {}
