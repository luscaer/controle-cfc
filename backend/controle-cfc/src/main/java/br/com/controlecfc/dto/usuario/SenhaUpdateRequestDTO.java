package br.com.controlecfc.dto.usuario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record SenhaUpdateRequestDTO(
    @NotBlank(message = "A senha deve ser informada")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$",
        message = "A senha deve ter no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial"
    )
    String novaSenha,

    @NotBlank(message = "A senha deve ser informada")
    String senhaAtual
) {}
