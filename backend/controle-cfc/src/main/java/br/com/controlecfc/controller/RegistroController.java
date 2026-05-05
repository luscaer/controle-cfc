package br.com.controlecfc.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.controlecfc.dto.registro.RegistroContaRequestDTO;
import br.com.controlecfc.service.ConviteCadastroService;
import br.com.controlecfc.service.RegistroService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/registro")
public class RegistroController {

    private final RegistroService registroService;
    private final ConviteCadastroService conviteCadastroService;

    public RegistroController(RegistroService registroService, ConviteCadastroService conviteCadastroService) {
        this.registroService = registroService;
        this.conviteCadastroService = conviteCadastroService;
    }

    @GetMapping("/validar-token")
    public ResponseEntity<Map<String, String>> validarTokenConvite(@RequestParam("token") String token) {
        String email = conviteCadastroService.validarToken(token);
        return ResponseEntity.ok(Map.of("email", email));
    }

    @PostMapping("/inicial")
    public ResponseEntity<String> registroInicial(@Valid @RequestBody RegistroContaRequestDTO request,
            @RequestParam("token") String token) {
        this.registroService.registroInicial(request, token);
        return ResponseEntity.status(HttpStatus.CREATED).body("");
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @PostMapping("/super")
    public ResponseEntity<String> superRegistroInicial(@Valid @RequestBody RegistroContaRequestDTO request) {
        this.registroService.superRegistroInicial(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("");
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @PostMapping("/convidar")
    public ResponseEntity<Void> enviarConvite(@RequestParam("email") String email) {
        this.conviteCadastroService.solicitarConvite(email);
        return ResponseEntity.ok().build();
    }

}
