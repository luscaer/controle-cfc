package br.com.controlecfc.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.br.CNPJ;

@Entity
@Table(name = "auto_escola")
public class AutoEscola {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String nome;

    @CNPJ
    @Column(nullable = false, unique = true)
    private String cnpj;

    @Column(nullable = false)
    private boolean ativo;

    @CreationTimestamp
    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;

    protected AutoEscola() {}

    public AutoEscola(String nome, String cnpj) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.ativo = true;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public void desativar() {
        this.ativo = false;
    }
}
