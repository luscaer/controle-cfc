package br.com.controlecfc.security.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.controlecfc.dto.usuario.UsuarioResponseDTO;
import br.com.controlecfc.security.SecurityUtils;
import br.com.controlecfc.security.UsuarioPrincipal;
import br.com.controlecfc.security.dto.LoginRequestDTO;
import br.com.controlecfc.security.dto.LoginResponseDTO;
import br.com.controlecfc.security.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${app.security.cookie.secure}")
    private boolean cookieSecure;

    private final AuthService authService;
    private final SecurityUtils securityUtils;

    public AuthController(AuthService authService, SecurityUtils securityUtils) {
        this.authService = authService;
        this.securityUtils = securityUtils;
    }

    @GetMapping("/me")
    public ResponseEntity<UsuarioResponseDTO> getUser() {
        UsuarioPrincipal usuarioLogado = this.securityUtils.getUsuarioLogado();

        UsuarioResponseDTO response = UsuarioResponseDTO.fromPrincipal(usuarioLogado);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        response.addHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioResponseDTO> login(@Valid @RequestBody LoginRequestDTO request,
            HttpServletResponse response) {
        LoginResponseDTO loginResult = this.authService.login(request);

        ResponseCookie cookie = ResponseCookie.from("token", loginResult.token())
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Strict")
                .build();

        response.addHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.status(HttpStatus.OK).body(loginResult.usuario());
    }

}
