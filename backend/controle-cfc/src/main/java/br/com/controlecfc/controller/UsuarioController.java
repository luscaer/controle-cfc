package br.com.controlecfc.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.controlecfc.dto.usuario.UsuarioRequestDTO;
import br.com.controlecfc.dto.usuario.UsuarioResponseDTO;
import br.com.controlecfc.security.UsuarioPrincipal;
import br.com.controlecfc.service.UsuarioService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping("/listar-usuarios")
    public ResponseEntity<List<UsuarioResponseDTO>> listarUsuarios() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UsuarioPrincipal usuarioPrincipal = (UsuarioPrincipal) auth.getPrincipal();
        UUID tenantId = usuarioPrincipal.getAutoEscolaId();

        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findAllByAutoEscolaId(tenantId));
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> criarUsuario(@Valid @RequestBody UsuarioRequestDTO request) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UsuarioPrincipal usuarioPrincipal = (UsuarioPrincipal) auth.getPrincipal();
        UUID tenantId = usuarioPrincipal.getAutoEscolaId();

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.criarUsuario(request, tenantId));
    }

}
