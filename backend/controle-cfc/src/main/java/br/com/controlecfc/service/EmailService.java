package br.com.controlecfc.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import br.com.controlecfc.exception.EmailEnvioException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${app.url-frontend}")
    private String urlFrontend;

    public EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public void enviarEmailRecuperacaoSenha(String destinatario, String nome, String token) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            Context context = new Context();
            context.setVariable("nomeUsuario", nome);
            context.setVariable("linkRedefinicao", urlFrontend + "/redefinir-senha?token=" + token);

            String corpoHtml = templateEngine.process("email-redefinicao-senha", context);

            helper.setTo(destinatario);
            helper.setFrom("nao-responda@controlecfc.com.br");
            helper.setSubject("Recuperação de Senha - Controle CFC");

            helper.setText(corpoHtml, true);

            ClassPathResource logo = new ClassPathResource("static/images/logo-completo-branco.jpg");
            ClassPathResource icone = new ClassPathResource("static/images/icone-chave.png");

            if (logo.exists()) {
                helper.addInline("logo-controle-cfc", logo);
            }

            if (icone.exists()) {
                helper.addInline("icone-chave", icone);
            }

            mailSender.send(mimeMessage);
        } catch (MailException | MessagingException e) {
            throw new EmailEnvioException("Falha ao enviar e-mail de recuperação para: " + destinatario);
        }
    }
}
