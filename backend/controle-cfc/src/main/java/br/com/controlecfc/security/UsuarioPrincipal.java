package br.com.controlecfc.security;

import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.controlecfc.domain.entity.Usuario;
import br.com.controlecfc.domain.enums.PerfilUsuario;

public class UsuarioPrincipal implements UserDetails {

    private final Usuario usuario;

    public UsuarioPrincipal(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        PerfilUsuario perfilUsuario = getPerfil();

        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + perfilUsuario.name());

        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return this.usuario.getSenha();
    }

    @Override
    public String getUsername() {
        return this.usuario.getEmail();
    }

    @Override
    public boolean isEnabled() {
        if (getPerfil() != PerfilUsuario.SUPER_ADMIN) {
            return this.usuario.isAtivo() && this.usuario.getAutoEscola().isAtivo();
        }

        return this.usuario.isAtivo();
    }

    public UUID getId() {
        return this.usuario.getId();
    }

    public PerfilUsuario getPerfil() {
        return this.usuario.getPerfilUsuario();
    }

    public UUID getAutoEscolaId() {
        return this.usuario.getAutoEscola().getId();
    }

}
