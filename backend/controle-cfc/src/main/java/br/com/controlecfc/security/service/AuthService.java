package br.com.controlecfc.security.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import br.com.controlecfc.dto.usuario.UsuarioResponseDTO;
import br.com.controlecfc.security.UsuarioPrincipal;
import br.com.controlecfc.security.dto.LoginRequestDTO;
import br.com.controlecfc.security.dto.LoginResponseDTO;
import br.com.controlecfc.security.jwt.JwtService;

@Service
public class AuthService {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(JwtService jwtService, AuthenticationManager authenticationManager) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public LoginResponseDTO login(LoginRequestDTO request) {
        UsuarioPrincipal usuarioPrincipal = (UsuarioPrincipal) authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.senha())).getPrincipal();

        String token = jwtService.generateToken(usuarioPrincipal);

        UsuarioResponseDTO usuario = UsuarioResponseDTO.fromPrincipal(usuarioPrincipal);

        return new LoginResponseDTO(token, usuario);
    }
}
