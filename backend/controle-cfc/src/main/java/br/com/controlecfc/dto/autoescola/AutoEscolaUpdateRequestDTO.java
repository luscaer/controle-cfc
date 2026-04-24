package br.com.controlecfc.dto.autoescola;

import jakarta.validation.constraints.NotBlank;

public record AutoEscolaUpdateRequestDTO(
    @NotBlank(message = "O nome é obrigatório") 
    String nome
) {}
