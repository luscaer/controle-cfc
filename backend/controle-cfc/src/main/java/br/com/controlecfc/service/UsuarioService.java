package br.com.controlecfc.service;

import java.util.List;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.controlecfc.domain.entity.AutoEscola;
import br.com.controlecfc.domain.entity.Usuario;
import br.com.controlecfc.domain.enums.PerfilUsuario;
import br.com.controlecfc.dto.usuario.UsuarioRequestDTO;
import br.com.controlecfc.dto.usuario.UsuarioResponseDTO;
import br.com.controlecfc.dto.usuario.UsuarioResumedResponseDTO;
import br.com.controlecfc.exception.AcessoNegadoException;
import br.com.controlecfc.exception.ConflitoException;
import br.com.controlecfc.exception.RecursoNaoEncontradoException;
import br.com.controlecfc.repository.AutoEscolaRepository;
import br.com.controlecfc.repository.UsuarioRepository;
import br.com.controlecfc.security.SecurityUtils;
import br.com.controlecfc.security.UsuarioPrincipal;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final AutoEscolaRepository autoEscolaRepository;

    private final SecurityUtils securityUtils;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, AutoEscolaRepository autoEscolaRepository,
            SecurityUtils securityUtils, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.autoEscolaRepository = autoEscolaRepository;
        this.securityUtils = securityUtils;
        this.passwordEncoder = passwordEncoder;
    }

    // --- MÉTODOS DE CONTEXTO (TENANT / AUTOESCOLA) ---
    // Usados por Administradores da própria unidade

    public List<UsuarioResponseDTO> findAllByAutoEscolaId() {
        return usuarioRepository.findAllByAutoEscolaId(getTenantId())
                .stream()
                .map(UsuarioResponseDTO::fromEntity)
                .toList();
    }

    public UsuarioResponseDTO buscarUsuarioPeloId(UUID id) {
        Usuario usuario = this.findById(id);
        validarPermissao(usuario.getAutoEscola().getId());

        return UsuarioResponseDTO.fromEntity(usuario);
    }

    @Transactional
    public UsuarioResponseDTO criarUsuario(UsuarioRequestDTO request) {
        return criarUsuario(request, getTenantId());
    }

    // --- MÉTODOS GLOBAIS (SUPER ADMIN) ---
    // Usados para suporte ou gestão centralizada

    public List<UsuarioResumedResponseDTO> findAllByAutoEscolaIdAndPerfilUsuario(UUID autoEscolaId, PerfilUsuario perfilUsuario) {
        List<Usuario> usuarios = usuarioRepository.findAllByAutoEscolaIdAndPerfilUsuario(autoEscolaId, perfilUsuario);

        return usuarios.stream()
                .map(usuario -> UsuarioResumedResponseDTO.fromEntity(usuario))
                .toList();
    }

    @Transactional
    public UsuarioResponseDTO criarUsuario(UsuarioRequestDTO request, UUID autoEscolaId) {
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new ConflitoException("Já existe um usuário com esse e-mail!");
        }

        AutoEscola autoEscola = autoEscolaRepository.findById(autoEscolaId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Auto escola não encontrada."));

        Usuario usuario = usuarioRepository.save(new Usuario(
                request.nome(),
                request.email(),
                request.telefone(),
                passwordEncoder.encode(request.senha()),
                request.perfilUsuario(),
                autoEscola));

        return UsuarioResponseDTO.fromEntity(usuario);
    }

    // --- LÓGICA DE NEGÓCIO PRIVADA (REUTILIZAÇÃO) ---

    private UUID getTenantId() {
        UsuarioPrincipal usuarioLogado = this.securityUtils.getUsuarioLogado();
        return usuarioLogado.getAutoEscolaId();
    }

    private Usuario findById(UUID id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário inexistente."));
    }

    private void validarPermissao(UUID idSolicitado) {
        UsuarioPrincipal usuarioLogado = securityUtils.getUsuarioLogado();

        if (usuarioLogado.getPerfil() != PerfilUsuario.SUPER_ADMIN
                && !idSolicitado.equals(usuarioLogado.getAutoEscolaId())) {
            throw new AcessoNegadoException("Você não tem permissão para acessar dados de outra Auto Escola.");
        }
    }

}
