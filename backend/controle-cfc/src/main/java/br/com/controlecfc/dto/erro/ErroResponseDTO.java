package br.com.controlecfc.dto.erro;

import java.time.LocalDateTime;

public record ErroResponseDTO(
    int status,
    String mensagem,
    LocalDateTime timestamp
) {}
