package br.com.controlecfc.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.controlecfc.dto.usuario.UsuarioRequestDTO;
import br.com.controlecfc.dto.usuario.UsuarioResponseDTO;
import br.com.controlecfc.service.UsuarioService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> save(@Valid @RequestBody UsuarioRequestDTO request) {

        // TODO (Sprint 3): Extrair o autoEscolaId do JWT via SecurityContextHolder
        Long tenantIdProvisorio = 1L;

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.criarUsuario(request, tenantIdProvisorio));
    }

}
