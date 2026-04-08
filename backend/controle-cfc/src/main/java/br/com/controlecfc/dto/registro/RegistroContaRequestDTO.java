package br.com.controlecfc.dto.registro;

import br.com.controlecfc.dto.autoescola.AutoEscolaRequestDTO;
import br.com.controlecfc.dto.usuario.UsuarioRequestDTO;

public record RegistroContaRequestDTO(
    AutoEscolaRequestDTO requestAutoEscola,
    UsuarioRequestDTO requestUsuario
) {}
