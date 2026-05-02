package br.com.controlecfc.security.config;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.stereotype.Component;

import br.com.controlecfc.security.UsuarioPrincipal;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Component
public class SpringSecurityAuditorAware implements AuditorAware<String>{

    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
            return Optional.empty();
        }
        
        UsuarioPrincipal principal = (UsuarioPrincipal) auth.getPrincipal();
        return Optional.ofNullable(principal.getUsername());

    }

}
