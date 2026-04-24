package br.com.controlecfc.service;

import java.util.List;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.controlecfc.domain.entity.AutoEscola;
import br.com.controlecfc.domain.entity.Usuario;
import br.com.controlecfc.dto.usuario.UsuarioRequestDTO;
import br.com.controlecfc.dto.usuario.UsuarioResponseDTO;
import br.com.controlecfc.exception.ConflitoException;
import br.com.controlecfc.exception.RecursoNaoEncontradoException;
import br.com.controlecfc.repository.AutoEscolaRepository;
import br.com.controlecfc.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final AutoEscolaRepository autoEscolaRepository;

    private final PasswordEncoder passwordEncoder;

    public UsuarioService(
            UsuarioRepository usuarioRepository,
            AutoEscolaRepository autoEscolaRepository,
            PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.autoEscolaRepository = autoEscolaRepository;
        this.passwordEncoder = passwordEncoder;
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
                passwordEncoder.encode(request.senha()),
                request.perfilUsuario(),
                autoEscola));

        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getPerfilUsuario(),
                usuario.isAtivo(),
                usuario.getAutoEscola().getId());
    }

    public List<UsuarioResponseDTO> findAllByAutoEscolaId(UUID autoEscolaId) {
        List<Usuario> usuarios = usuarioRepository.findAllByAutoEscolaId(autoEscolaId);

        return usuarios.stream()
                .map(usuario -> new UsuarioResponseDTO(
                        usuario.getId(),
                        usuario.getNome(),
                        usuario.getEmail(),
                        usuario.getPerfilUsuario(),
                        usuario.isAtivo(),
                        usuario.getAutoEscola().getId()))
                .toList();
    }

}
