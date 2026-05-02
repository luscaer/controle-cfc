package br.com.controlecfc.dto.recuperacaoSenha;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record RedefinirSenhaRequestDTO(
    @NotBlank
    String token,

    @NotBlank(message = "A senha deve ser informada")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$",
        message = "A senha deve ter no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial"
    )
    String senha
) {}
