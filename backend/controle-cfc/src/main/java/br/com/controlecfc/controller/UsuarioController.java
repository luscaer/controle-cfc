package br.com.controlecfc.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.controlecfc.domain.enums.PerfilUsuario;
import br.com.controlecfc.dto.usuario.UsuarioRequestDTO;
import br.com.controlecfc.dto.usuario.UsuarioResponseDTO;
import br.com.controlecfc.dto.usuario.UsuarioResumedResponseDTO;
import br.com.controlecfc.dto.usuario.UsuarioUpdateRequestDTO;
import br.com.controlecfc.service.UsuarioService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @GetMapping("/auto-escola/{autoEscolaId}")
    public ResponseEntity<List<UsuarioResumedResponseDTO>> buscarUsuariosPelaAutoEscolaEPeloPerfil(
            @PathVariable UUID autoEscolaId, @RequestParam(defaultValue = "ADMINISTRADOR") PerfilUsuario perfil) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(usuarioService.findAllByAutoEscolaIdAndPerfilUsuario(autoEscolaId, perfil));
    }

    @PutMapping("/me")
    public ResponseEntity<UsuarioResponseDTO> atualizarMeuUsuario(@Valid @RequestBody UsuarioUpdateRequestDTO request) {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.atualizarMeuUsuario(request));
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping("/listar-usuarios")
    public ResponseEntity<List<UsuarioResponseDTO>> listarUsuarios() {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findAllByAutoEscolaId());
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> criarUsuario(@Valid @RequestBody UsuarioRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.criarUsuario(request));
    }

}
