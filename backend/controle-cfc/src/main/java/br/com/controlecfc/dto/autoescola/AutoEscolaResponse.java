package br.com.controlecfc.dto.autoescola;

import java.time.LocalDateTime;

public record AutoEscolaResponse(
    Long id,
    String nome,
    String cnpj,
    boolean ativo,
    LocalDateTime dataCriacao
) {}
