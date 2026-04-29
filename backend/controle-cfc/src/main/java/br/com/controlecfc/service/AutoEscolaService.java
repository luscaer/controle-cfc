package br.com.controlecfc.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.controlecfc.domain.entity.AutoEscola;
import br.com.controlecfc.domain.enums.PerfilUsuario;
import br.com.controlecfc.dto.autoescola.AutoEscolaRequestDTO;
import br.com.controlecfc.dto.autoescola.AutoEscolaResponseDTO;
import br.com.controlecfc.dto.autoescola.AutoEscolaUpdateRequestDTO;
import br.com.controlecfc.exception.AcessoNegadoException;
import br.com.controlecfc.exception.ConflitoException;
import br.com.controlecfc.exception.RecursoNaoEncontradoException;
import br.com.controlecfc.repository.AutoEscolaRepository;
import br.com.controlecfc.security.SecurityUtils;
import br.com.controlecfc.security.UsuarioPrincipal;

@Service
public class AutoEscolaService {

    private final AutoEscolaRepository autoEscolaRepository;

    private final SecurityUtils securityUtils;

    public AutoEscolaService(AutoEscolaRepository autoEscolaRepository, SecurityUtils securityUtils) {
        this.autoEscolaRepository = autoEscolaRepository;
        this.securityUtils = securityUtils;
    }

    // --- MÉTODOS GLOBAIS (SUPER ADMIN) ---
    // Usados para suporte ou gestão centralizada

    public Page<AutoEscolaResponseDTO> buscarTodasAutoEscolas(String busca, Pageable pageable) {
        Page<AutoEscola> paginaDeAutoEscolas;

        if (busca == null || busca.trim().isEmpty()) {
            paginaDeAutoEscolas = autoEscolaRepository.findAll(pageable);
        } else {
            String buscaTratada = busca.trim();

            if (buscaTratada.matches("[0-9\\.\\-\\/\\(\\)\\s]+")) {
                buscaTratada = buscaTratada.replaceAll("\\D", "");
            }

            paginaDeAutoEscolas = autoEscolaRepository.findByNomeContainingIgnoreCaseOrCnpjContaining(busca, buscaTratada, pageable);
        }

        return paginaDeAutoEscolas.map(autoEscola -> AutoEscolaResponseDTO.fromEntity(autoEscola));
    }

    @Transactional
    public AutoEscolaResponseDTO criarAutoEscola(AutoEscolaRequestDTO request) {
        if (autoEscolaRepository.existsByCnpj(request.cnpj())) {
            throw new ConflitoException("Já existe uma auto escola com esse cnpj!");
        }

        AutoEscola autoEscola = autoEscolaRepository.save(new AutoEscola(request.nome(), request.cnpj()));

        return AutoEscolaResponseDTO.fromEntity(autoEscola);
    }

    @Transactional
    public AutoEscolaResponseDTO atualizarAutoEscola(UUID id, AutoEscolaUpdateRequestDTO request) {
        validarPermissao(id);

        AutoEscola autoEscola = this.findById(id);

        autoEscola.setNome(request.nome());

        return AutoEscolaResponseDTO.fromEntity(autoEscola);

    }

    // --- MÉTODOS DE CONTEXTO (TENANT / AUTOESCOLA) ---
    // Usados por Administradores da própria unidade

    public AutoEscolaResponseDTO buscarAutoEscolaPeloId(UUID id) {
        validarPermissao(id);

        AutoEscola autoEscola = this.findById(id);

        return AutoEscolaResponseDTO.fromEntity(autoEscola);
    }

    @Transactional
    public void desativarAutoEscola(UUID id) {
        AutoEscola autoEscola = findById(id);

        autoEscola.desativar();

        autoEscolaRepository.save(autoEscola);
    }

    @Transactional
    public void ativarAutoEscola(UUID id) {
        AutoEscola autoEscola = findById(id);

        autoEscola.ativar();

        autoEscolaRepository.save(autoEscola);
    }

    // --- LÓGICA DE NEGÓCIO PRIVADA (REUTILIZAÇÃO) ---

    private AutoEscola findById(UUID id) {
        return autoEscolaRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Auto Escola inexistente."));
    }

    private void validarPermissao(UUID idSolicitado) {
        UsuarioPrincipal usuarioLogado = securityUtils.getUsuarioLogado();

        if (usuarioLogado.getPerfil() == PerfilUsuario.ADMINISTRADOR
                && !idSolicitado.equals(usuarioLogado.getAutoEscolaId())) {
            throw new AcessoNegadoException("Você não tem permissão para acessar dados de outra Auto Escola.");
        }
    }

}
