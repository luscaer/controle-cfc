package br.com.controlecfc.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.controlecfc.service.AutoEscolaService;
import br.com.controlecfc.dto.autoescola.AutoEscolaResponseDTO;

@RestController
@RequestMapping("/api/v1/auto-escolas")
public class AutoEscolaController {

    private final AutoEscolaService autoEscolaService;

    public AutoEscolaController(AutoEscolaService autoEscolaService) {
        this.autoEscolaService = autoEscolaService;
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @GetMapping
    public ResponseEntity<List<AutoEscolaResponseDTO>> buscarTodasAutoEscolas() {
        return ResponseEntity.status(HttpStatus.OK).body(autoEscolaService.buscarTodasAutoEscolas());
    }

    // @PostMapping()
    // public ResponseEntity<AutoEscolaResponseDTO> criarAutoEscola(@Valid @RequestBody AutoEscolaRequestDTO request) {
    //     return ResponseEntity.status(HttpStatus.CREATED).body(autoEscolaService.criarAutoEscola(request));
    // }

}
