package br.com.controlecfc.dto.usuario;

import br.com.controlecfc.domain.enums.PerfilUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record UsuarioRequestDTO(
    @NotBlank(message = "O nome é obrigatório")
    String nome,

    @Email
    @NotBlank(message = "O email é obrigatório")
    String email,

    
    @NotBlank(message = "A senha deve ser informada")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$",
        message = "A senha deve ter no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial"
    )
    String senha,

    @NotNull(message = "O perfil do usuário é obrigatório")
    PerfilUsuario perfilUsuario
) {}
