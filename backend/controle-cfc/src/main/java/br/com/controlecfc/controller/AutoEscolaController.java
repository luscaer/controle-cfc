package br.com.controlecfc.controller;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.controlecfc.service.AutoEscolaService;
import jakarta.validation.Valid;
import br.com.controlecfc.dto.autoescola.AutoEscolaResponseDTO;
import br.com.controlecfc.dto.autoescola.AutoEscolaUpdateRequestDTO;

@RestController
@RequestMapping("/api/v1/auto-escolas")
public class AutoEscolaController {

    private final AutoEscolaService autoEscolaService;

    public AutoEscolaController(AutoEscolaService autoEscolaService) {
        this.autoEscolaService = autoEscolaService;
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @GetMapping
    public ResponseEntity<Page<AutoEscolaResponseDTO>> buscarTodasAutoEscolas(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String busca) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.status(HttpStatus.OK).body(autoEscolaService.buscarTodasAutoEscolas(busca, pageable));
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @PatchMapping("/{id}/ativar")
    public ResponseEntity<Void> ativarAutoEscola(@PathVariable UUID id) {
        autoEscolaService.ativarAutoEscola(id);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @PatchMapping("/{id}/desativar")
    public ResponseEntity<Void> desativarAutoEscola(@PathVariable UUID id) {
        autoEscolaService.desativarAutoEscola(id);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping("/{id}")
    public ResponseEntity<AutoEscolaResponseDTO> buscarAutoEscolaPeloId(@PathVariable UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(autoEscolaService.buscarAutoEscolaPeloId(id));
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping("/{id}")
    public ResponseEntity<AutoEscolaResponseDTO> atualizarAutoEscola(@PathVariable UUID id,
            @Valid @RequestBody AutoEscolaUpdateRequestDTO request) {
        return ResponseEntity.status(HttpStatus.OK).body(autoEscolaService.atualizarAutoEscola(id, request));
    }

}
