package br.com.controlecfc.dto.usuario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UsuarioUpdateRequestDTO(
    @NotBlank(message = "O nome é obrigatório")
    String nome,

    @NotBlank
    @Pattern(regexp = "^\\d{10,11}$", message = "O telefone deve ter 10 ou 11 dígitos (apenas números)")
    String telefone
) {}
