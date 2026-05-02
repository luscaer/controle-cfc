package br.com.controlecfc.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.controlecfc.domain.entity.RecuperacaoSenha;

@Repository
public interface RecuperacaoSenhaRepository extends JpaRepository<RecuperacaoSenha, UUID> {

    Optional<RecuperacaoSenha> findByToken(String token);

}
