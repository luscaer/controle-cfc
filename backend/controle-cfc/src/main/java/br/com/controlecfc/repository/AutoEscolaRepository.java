package br.com.controlecfc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.controlecfc.domain.entity.AutoEscola;

@Repository
public interface AutoEscolaRepository extends JpaRepository<AutoEscola, Long>{

    Optional<AutoEscola> findByCnpj(String cnpj);
}
