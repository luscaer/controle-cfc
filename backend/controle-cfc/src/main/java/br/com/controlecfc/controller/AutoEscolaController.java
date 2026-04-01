package br.com.controlecfc.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.controlecfc.dto.autoescola.AutoEscolaRequest;
import br.com.controlecfc.dto.autoescola.AutoEscolaResponse;
import br.com.controlecfc.service.AutoEscolaService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auto-escolas")
public class AutoEscolaController {

    private final AutoEscolaService autoEscolaService;

    public AutoEscolaController(AutoEscolaService autoEscolaService) {
        this.autoEscolaService = autoEscolaService;
    }

    @PostMapping()
    public ResponseEntity<AutoEscolaResponse> save(@Valid @RequestBody AutoEscolaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(autoEscolaService.criarAutoEscola(request));
    }

}
