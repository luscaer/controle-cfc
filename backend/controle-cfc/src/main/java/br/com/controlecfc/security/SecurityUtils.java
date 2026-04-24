package br.com.controlecfc.security;

import org.springframework.stereotype.Component;

import br.com.controlecfc.exception.NaoAutenticadoException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Component
public class SecurityUtils {

    public UsuarioPrincipal getUsuarioLogado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || !(auth.getPrincipal() instanceof UsuarioPrincipal)) {
            throw new NaoAutenticadoException("Não há nenhum usuário logado, por favor faça o login novamente.");
        }

        return (UsuarioPrincipal) auth.getPrincipal();
    }

}
