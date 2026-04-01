package br.com.controlecfc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.controlecfc.domain.entity.Usuario;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

    Optional<Usuario> findByEmail(String email);

    List<Usuario> findAllByAutoEscolaId(Long autoEscolaId);

}
