package br.com.controlecfc.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.controlecfc.domain.entity.AutoEscola;
import br.com.controlecfc.dto.autoescola.AutoEscolaRequestDTO;
import br.com.controlecfc.dto.autoescola.AutoEscolaResponseDTO;
import br.com.controlecfc.exception.ConflitoException;
import br.com.controlecfc.repository.AutoEscolaRepository;

@Service
public class AutoEscolaService {

    private final AutoEscolaRepository autoEscolaRepository;

    public AutoEscolaService(AutoEscolaRepository autoEscolaRepository) {
        this.autoEscolaRepository = autoEscolaRepository;
    }

    public Page<AutoEscolaResponseDTO> buscarTodasAutoEscolas(String busca, Pageable pageable) {
        Page<AutoEscola> paginaDeAutoEscolas;
        
        if(busca == null || busca.trim().isEmpty()) {
            paginaDeAutoEscolas = autoEscolaRepository.findAll(pageable);
        } else {
            paginaDeAutoEscolas = autoEscolaRepository.findByNomeContainingIgnoreCaseOrCnpjContaining(busca, busca, pageable);
        }

        return paginaDeAutoEscolas.map(autoEscola -> new AutoEscolaResponseDTO(
                autoEscola.getId(),
                autoEscola.getNome(),
                autoEscola.getCnpj(),
                autoEscola.isAtivo(),
                autoEscola.getDataCriacao()));
    }

    @Transactional
    public AutoEscolaResponseDTO criarAutoEscola(AutoEscolaRequestDTO request) {
        if (autoEscolaRepository.existsByCnpj(request.cnpj())) {
            throw new ConflitoException("Já existe uma auto escola com esse cnpj!");
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
