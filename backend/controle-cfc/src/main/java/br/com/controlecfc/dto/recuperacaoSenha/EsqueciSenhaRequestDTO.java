package br.com.controlecfc.dto.recuperacaoSenha;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EsqueciSenhaRequestDTO(
    @Email
    @NotBlank
    String email
) {}
