package br.com.controlecfc.dto.autoescola;

import org.hibernate.validator.constraints.br.CNPJ;

import jakarta.validation.constraints.NotBlank;

public record AutoEscolaRequestDTO(
    @NotBlank(message = "O nome é obrigatório") 
    String nome,
    
    @NotBlank(message = "O CNPJ é obrigatório") 
    @CNPJ(message = "CNPJ em formato inválido") 
    String cnpj
) {}
