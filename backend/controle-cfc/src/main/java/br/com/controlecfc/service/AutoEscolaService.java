package br.com.controlecfc.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.controlecfc.domain.entity.AutoEscola;
import br.com.controlecfc.dto.autoescola.AutoEscolaRequestDTO;
import br.com.controlecfc.dto.autoescola.AutoEscolaResponseDTO;
import br.com.controlecfc.repository.AutoEscolaRepository;

@Service
public class AutoEscolaService {

    private final AutoEscolaRepository autoEscolaRepository;

    public AutoEscolaService(AutoEscolaRepository autoEscolaRepository) {
        this.autoEscolaRepository = autoEscolaRepository;
    }

    @Transactional
    public AutoEscolaResponseDTO criarAutoEscola(AutoEscolaRequestDTO request) {
        if (!autoEscolaRepository.findByCnpj(request.cnpj()).isEmpty()) {
            throw new IllegalArgumentException("Já existe uma auto escola com esse cnpj!");
        }

        AutoEscola autoEscola = autoEscolaRepository.save(new AutoEscola(request.nome(), request.cnpj()));

        return new AutoEscolaResponseDTO(
                autoEscola.getId(),
                autoEscola.getNome(),
                autoEscola.getCnpj(),
                autoEscola.isAtivo(),
                autoEscola.getDataCriacao());
    }

}
