package br.com.controlecfc.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import br.com.controlecfc.domain.entity.ConviteCadastro;
import br.com.controlecfc.exception.RecursoNaoEncontradoException;
import br.com.controlecfc.exception.TokenRecuperacaoInvalidoException;
import br.com.controlecfc.repository.ConviteCadastroRepository;
import jakarta.transaction.Transactional;

@Service
public class ConviteCadastroService {

    private final ConviteCadastroRepository conviteCadastroRepository;
    private final EmailService emailService;

    public ConviteCadastroService(ConviteCadastroRepository conviteCadastroRepository, EmailService emailService) {
        this.conviteCadastroRepository = conviteCadastroRepository;
        this.emailService = emailService;
    }

    @Transactional
    public void solicitarConvite(String email) {
        String token = UUID.randomUUID().toString();

        LocalDateTime expiracao = LocalDateTime.now().plusDays(1);

        conviteCadastroRepository.save(new ConviteCadastro(email, token, expiracao));

        emailService.enviarEmailConvite(email, token);
    }

    public String validarToken(String token) {
        ConviteCadastro convite = conviteCadastroRepository.findByToken(token)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Token não encontrado."));


        LocalDateTime agora = LocalDateTime.now();

        if (agora.isAfter(convite.getDataExpiracao()) || convite.isUtilizado()) {
            throw new TokenRecuperacaoInvalidoException("O link de cadastro expirou ou já foi utilizado.");
        }

        return convite.getEmail();
    }

    @Transactional
    public void concluirConvite(String token) {
         ConviteCadastro convite = conviteCadastroRepository.findByToken(token)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Token não encontrado."));

        convite.marcarComoUtilizado();
    }

}
