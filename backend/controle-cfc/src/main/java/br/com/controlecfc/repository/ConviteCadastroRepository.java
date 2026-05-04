package br.com.controlecfc.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.controlecfc.domain.entity.ConviteCadastro;

@Repository
public interface ConviteCadastroRepository extends JpaRepository<ConviteCadastro, UUID> {

    Optional<ConviteCadastro> findByToken(String token);

    Optional<ConviteCadastro> findByEmail(String email);

}
