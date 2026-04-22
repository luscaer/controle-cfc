package br.com.controlecfc.security;

import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Component
public class SecurityUtils {

    public UsuarioPrincipal getUsuarioLogado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (UsuarioPrincipal) auth.getPrincipal();
    }

}
