package br.com.controlecfc.dto.autoescola;

import java.time.LocalDateTime;
import java.util.UUID;

import br.com.controlecfc.domain.entity.AutoEscola;

public record AutoEscolaResponseDTO(
        UUID id,
        String nome,
        String cnpj,
        boolean ativo,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao) {
    public static AutoEscolaResponseDTO fromEntity(AutoEscola autoEscola) {
        return new AutoEscolaResponseDTO(
                autoEscola.getId(),
                autoEscola.getNome(),
                autoEscola.getCnpj(),
                autoEscola.isAtivo(),
                autoEscola.getDataCriacao(),
                autoEscola.getDataAtualizacao());
    }
}
