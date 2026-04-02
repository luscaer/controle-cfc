package br.com.controlecfc.domain.entity;

import br.com.controlecfc.domain.enums.PerfilUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String nome;

    @NotBlank
    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    @Size(min = 6)
    @Column(nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PerfilUsuario perfilUsuario;

    @Column(nullable = false)
    private boolean ativo;

    @ManyToOne
    @JoinColumn(name = "auto_escola_id")
    private AutoEscola autoEscola;

    protected Usuario() {
    }

    public Usuario(String nome, String email, String senha, PerfilUsuario perfilUsuario, AutoEscola autoEscola) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.perfilUsuario = perfilUsuario;
        this.ativo = true;
        this.autoEscola = autoEscola;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void alterarSenha(String novaSenhaHasheada) {
        this.senha = novaSenhaHasheada;
    }

    public PerfilUsuario getPerfilUsuario() {
        return perfilUsuario;
    }

    public void setPerfilUsuario(PerfilUsuario perfilUsuario) {
        this.perfilUsuario = perfilUsuario;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void desativar() {
        this.ativo = false;
    }

    public AutoEscola getAutoEscola() {
        return autoEscola;
    }
}
