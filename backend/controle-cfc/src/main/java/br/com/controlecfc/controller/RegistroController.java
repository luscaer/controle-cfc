package br.com.controlecfc.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.controlecfc.dto.registro.RegistroContaRequestDTO;
import br.com.controlecfc.service.RegistroService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth/registro")
public class RegistroController {

    private final RegistroService registroService;

    public RegistroController(RegistroService registroService) {
        this.registroService = registroService;
    }

    @PostMapping
    public ResponseEntity<String> registrar(@Valid @RequestBody RegistroContaRequestDTO request) {
        this.registroService.registroInicial(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("");
    }

}
