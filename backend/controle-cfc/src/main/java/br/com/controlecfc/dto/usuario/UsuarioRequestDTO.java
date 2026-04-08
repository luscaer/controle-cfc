package br.com.controlecfc.dto.usuario;

import br.com.controlecfc.domain.enums.PerfilUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UsuarioRequestDTO(
    @NotBlank(message = "O nome é obrigatório")
    String nome,

    @Email
    @NotBlank(message = "O email é obrigatório")
    String email,

    @Size(min = 6)
    @NotBlank(message = "A senha deve ser informada")
    String senha,

    @NotNull(message = "O perfil do usuário é obrigatório")
    PerfilUsuario perfilUsuario
) {}
