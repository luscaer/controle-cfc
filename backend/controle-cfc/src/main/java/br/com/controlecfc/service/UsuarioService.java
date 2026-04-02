package br.com.controlecfc.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.controlecfc.domain.entity.AutoEscola;
import br.com.controlecfc.domain.entity.Usuario;
import br.com.controlecfc.domain.enums.PerfilUsuario;
import br.com.controlecfc.dto.usuario.UsuarioRequestDTO;
import br.com.controlecfc.dto.usuario.UsuarioResponseDTO;
import br.com.controlecfc.repository.AutoEscolaRepository;
import br.com.controlecfc.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final AutoEscolaRepository autoEscolaRepository;

    public UsuarioService(UsuarioRepository usuarioRepository, AutoEscolaRepository autoEscolaRepository) {
        this.usuarioRepository = usuarioRepository;
        this.autoEscolaRepository = autoEscolaRepository;
    }

    @Transactional
    public UsuarioResponseDTO criarUsuario(UsuarioRequestDTO request, Long autoEscolaId) {
        if (!usuarioRepository.findByEmail(request.email()).isEmpty()) {
            throw new IllegalArgumentException("Já existe um usuário com esse e-mail!");
        }

        AutoEscola autoEscola = autoEscolaRepository.findById(autoEscolaId)
                .orElseThrow(() -> new IllegalArgumentException("Auto escola não encontrada."));

        Usuario usuario = usuarioRepository.save(new Usuario(
                request.nome(),
                request.email(),
                request.senha(),
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

}
