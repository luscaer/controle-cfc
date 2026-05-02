package br.com.controlecfc.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.controlecfc.domain.entity.Usuario;
import br.com.controlecfc.domain.enums.PerfilUsuario;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, UUID>{

    Optional<Usuario> findByEmail(String email);

    boolean existsByEmail(String email);

    List<Usuario> findAllByAutoEscolaId(UUID autoEscolaId);

    List<Usuario> findAllByAutoEscolaIdAndPerfilUsuario(UUID autoEscolaId, PerfilUsuario perfilUsuario);

}
