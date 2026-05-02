package br.com.controlecfc.security.service;

import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import br.com.controlecfc.domain.entity.Usuario;
import br.com.controlecfc.dto.usuario.UsuarioResponseDTO;
import br.com.controlecfc.exception.RecursoNaoEncontradoException;
import br.com.controlecfc.repository.UsuarioRepository;
import br.com.controlecfc.security.UsuarioPrincipal;
import br.com.controlecfc.security.dto.LoginRequestDTO;
import br.com.controlecfc.security.dto.LoginResponseDTO;
import br.com.controlecfc.security.jwt.JwtService;

@Service
public class AuthService {

    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;
    private final AuthenticationManager authenticationManager;

    public AuthService(JwtService jwtService, UsuarioRepository usuarioRepository,
            AuthenticationManager authenticationManager) {
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;
        this.authenticationManager = authenticationManager;
    }

    public LoginResponseDTO login(LoginRequestDTO request) {
        UsuarioPrincipal usuarioPrincipal = (UsuarioPrincipal) authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.senha())).getPrincipal();

        String token = jwtService.generateToken(usuarioPrincipal);

        UsuarioResponseDTO usuario = this.buscarUsuarioPeloId(usuarioPrincipal.getId());

        return new LoginResponseDTO(token, usuario);
    }

    public UsuarioResponseDTO buscarUsuarioPeloId(UUID id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário inexistente."));

        return UsuarioResponseDTO.fromEntity(usuario);
    }
}
