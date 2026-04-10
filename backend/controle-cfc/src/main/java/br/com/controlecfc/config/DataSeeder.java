package br.com.controlecfc.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import br.com.controlecfc.domain.entity.AutoEscola;
import br.com.controlecfc.domain.entity.Usuario;
import br.com.controlecfc.domain.enums.PerfilUsuario;
import br.com.controlecfc.repository.AutoEscolaRepository;
import br.com.controlecfc.repository.UsuarioRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    @Value("${app.superadmin.name}")
    private String nome;
    
    @Value("${app.superadmin.email}")
    private String email;

    @Value("${app.superadmin.password}")
    private String senha;

    private final AutoEscolaRepository autoEscolaRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(AutoEscolaRepository autoEscolaRepository, UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {
        this.autoEscolaRepository = autoEscolaRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (usuarioRepository.existsByEmail(email)) {
            logger.warn("Já existe um usuário com esse e-mail!");
            return;
        }

        AutoEscola autoEscola = new AutoEscola("SISTEMA CONTROLE CFC", "79.935.520/0001-46");

        autoEscolaRepository.save(autoEscola);
        usuarioRepository.save(new Usuario(
                "Lucas Admin",
                email,
                passwordEncoder.encode(senha),
                PerfilUsuario.SUPER_ADMIN,
                autoEscola));
        
        logger.info("SUPER ADMIN criado com sucesso!");
    }
}
