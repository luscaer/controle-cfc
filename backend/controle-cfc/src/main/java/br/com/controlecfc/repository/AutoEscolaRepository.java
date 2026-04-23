package br.com.controlecfc.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.controlecfc.domain.entity.AutoEscola;

@Repository
public interface AutoEscolaRepository extends JpaRepository<AutoEscola, UUID>{

    Optional<AutoEscola> findByCnpj(String cnpj);

    boolean existsByCnpj(String cnpj);

    Page<AutoEscola> findByNomeContainingIgnoreCaseOrCnpjContaining(String busca, String cnpj, Pageable pageable);
}
