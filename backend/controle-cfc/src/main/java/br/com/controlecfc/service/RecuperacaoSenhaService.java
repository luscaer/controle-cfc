package br.com.controlecfc.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.controlecfc.domain.entity.RecuperacaoSenha;
import br.com.controlecfc.domain.entity.Usuario;
import br.com.controlecfc.exception.RecursoNaoEncontradoException;
import br.com.controlecfc.exception.TokenRecuperacaoInvalidoException;
import br.com.controlecfc.repository.RecuperacaoSenhaRepository;
import br.com.controlecfc.repository.UsuarioRepository;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;

@Service
public class RecuperacaoSenhaService {

    private final UsuarioRepository usuarioRepository;
    private final RecuperacaoSenhaRepository recuperacaoSenhaRepository;
    private final EmailService emailService;

    private final PasswordEncoder passwordEncoder;

    public RecuperacaoSenhaService(UsuarioRepository usuarioRepository,
            RecuperacaoSenhaRepository recuperacaoSenhaRepository, EmailService emailService,
            PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.recuperacaoSenhaRepository = recuperacaoSenhaRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void solicitarRecuperacao(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado."));

        String token = UUID.randomUUID().toString();

        LocalDateTime expiracao = LocalDateTime.now().plusMinutes(15);

        recuperacaoSenhaRepository.save(new RecuperacaoSenha(token, usuario, expiracao, false));

        emailService.enviarEmailRecuperacaoSenha(email, usuario.getNome(), token);
    }

    @Transactional
    public void redefinirSenha(String token, String novaSenha) {
        RecuperacaoSenha recuperacaoSenha = recuperacaoSenhaRepository.findByToken(token)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Token não encontrado."));


        LocalDateTime agora = LocalDateTime.now();

        if (agora.isAfter(recuperacaoSenha.getDataExpiracao()) || recuperacaoSenha.isUtilizado()) {
            throw new TokenRecuperacaoInvalidoException("O link de recuperação expirou ou já foi utilizado.");
        }

        Usuario usuario = recuperacaoSenha.getUsuario();

        usuario.alterarSenha(passwordEncoder.encode(novaSenha));
        recuperacaoSenha.marcarComoUtilizado();
    }

}
