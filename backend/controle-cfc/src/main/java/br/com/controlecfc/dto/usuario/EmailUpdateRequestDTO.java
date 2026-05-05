package br.com.controlecfc.dto.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EmailUpdateRequestDTO(
    @Email
    @NotBlank(message = "O email é obrigatório")
    String novoEmail,

    @NotBlank(message = "A senha deve ser informada")
    String senhaAtual
) {}
