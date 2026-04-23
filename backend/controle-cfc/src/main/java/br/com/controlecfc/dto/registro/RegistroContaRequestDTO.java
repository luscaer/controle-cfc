package br.com.controlecfc.dto.registro;

import br.com.controlecfc.dto.autoescola.AutoEscolaRequestDTO;
import br.com.controlecfc.dto.usuario.UsuarioRequestDTO;
import jakarta.validation.Valid;

public record RegistroContaRequestDTO(
    @Valid
    AutoEscolaRequestDTO requestAutoEscola,
    @Valid
    UsuarioRequestDTO requestUsuario
) {}
