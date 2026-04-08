package br.com.controlecfc.security.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(
    @Email
    @NotBlank(message = "O email é obrigatório")
    String email,

    @NotBlank(message = "A senha deve ser informada")
    String senha
) {}
