package br.com.controlecfc.dto.autoescola;

import java.time.LocalDateTime;
import java.util.UUID;

public record AutoEscolaResponseDTO(
    UUID id,
    String nome,
    String cnpj,
    boolean ativo,
    LocalDateTime dataCriacao
) {}
