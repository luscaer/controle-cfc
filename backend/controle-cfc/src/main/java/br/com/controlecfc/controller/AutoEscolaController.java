package br.com.controlecfc.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<Page<AutoEscolaResponseDTO>> buscarTodasAutoEscolas(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String busca) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.status(HttpStatus.OK).body(autoEscolaService.buscarTodasAutoEscolas(busca, pageable));
    }

    // @PostMapping()
    // public ResponseEntity<AutoEscolaResponseDTO> criarAutoEscola(@Valid
    // @RequestBody AutoEscolaRequestDTO request) {
    // return
    // ResponseEntity.status(HttpStatus.CREATED).body(autoEscolaService.criarAutoEscola(request));
    // }

}
