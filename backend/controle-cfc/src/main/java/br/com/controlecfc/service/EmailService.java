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

    public void enviarEmailConvite(String destinatario, String token) {
        Context context = new Context();
        context.setVariable("linkRedefinicao", urlFrontend + "/finalizar-cadastro?token=" + token);

        enviarEmailTemplate(destinatario, "Convite de Cadastro - Controle CFC", "email-convite", context,
                "static/images/logo-volante.png");
    }

    public void enviarEmailRecuperacaoSenha(String destinatario, String nome, String token) {
        Context context = new Context();
        context.setVariable("nomeUsuario", nome);
        context.setVariable("linkRedefinicao", urlFrontend + "/redefinir-senha?token=" + token);

        enviarEmailTemplate(destinatario, "Recuperação de Senha - Controle CFC", "email-redefinicao-senha", context,
                "static/images/icone-chave.png");
    }

    private void enviarEmailTemplate(String destinatario, String assunto, String template, Context context,
            String caminhoIcone) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            String corpoHtml = templateEngine.process(template, context);
            helper.setTo(destinatario);
            helper.setFrom("nao-responda@controlecfc.com.br");
            helper.setSubject(assunto);
            helper.setText(corpoHtml, true);

            ClassPathResource logo = new ClassPathResource("static/images/logo-completo-branco.jpg");
            ClassPathResource icone = new ClassPathResource(caminhoIcone);

            if (logo.exists()) {
                helper.addInline("logo-controle-cfc", logo);
            }

            if (icone.exists()) {
                helper.addInline("icone-dinamico", icone);
            }

            mailSender.send(mimeMessage);
        } catch (MailException | MessagingException e) {
            throw new EmailEnvioException("Falha ao enviar e-mail para: " + destinatario);
        }
    }
}
