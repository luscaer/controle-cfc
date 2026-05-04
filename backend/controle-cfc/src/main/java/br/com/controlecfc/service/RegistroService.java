package br.com.controlecfc.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.controlecfc.domain.enums.PerfilUsuario;
import br.com.controlecfc.dto.autoescola.AutoEscolaResponseDTO;
import br.com.controlecfc.dto.registro.RegistroContaRequestDTO;
import br.com.controlecfc.dto.usuario.UsuarioRequestDTO;

@Service
public class RegistroService {

    private final AutoEscolaService autoEscolaService;
    private final UsuarioService usuarioService;
    private final ConviteCadastroService conviteCadastroService;

    public RegistroService(AutoEscolaService autoEscolaService, UsuarioService usuarioService,
            ConviteCadastroService conviteCadastroService) {
        this.autoEscolaService = autoEscolaService;
        this.usuarioService = usuarioService;
        this.conviteCadastroService = conviteCadastroService;
    }

    // --- MÉTODOS DE CONTEXTO (TENANT / AUTOESCOLA) ---
    // Usados por Administradores da própria unidade

    @Transactional
    public void registroInicial(RegistroContaRequestDTO request, String token) {
        String email = conviteCadastroService.validarToken(token);

        AutoEscolaResponseDTO autoEscolaResponse = this.autoEscolaService.criarAutoEscola(request.requestAutoEscola());
        UsuarioRequestDTO usuarioRequest = new UsuarioRequestDTO(
                request.requestUsuario().nome(),
                email,
                request.requestUsuario().telefone(),
                request.requestUsuario().senha(),
                PerfilUsuario.ADMINISTRADOR);

        this.usuarioService.criarUsuario(usuarioRequest, autoEscolaResponse.id());
        conviteCadastroService.concluirConvite(token);
    }

    // --- MÉTODOS GLOBAIS (SUPER ADMIN) ---
    // Usados para suporte ou gestão centralizada

    @Transactional
    public void superRegistroInicial(RegistroContaRequestDTO request) {
        AutoEscolaResponseDTO autoEscola = this.autoEscolaService.criarAutoEscola(request.requestAutoEscola());

        UsuarioRequestDTO usuarioRequest = new UsuarioRequestDTO(
                request.requestUsuario().nome(),
                request.requestUsuario().email(),
                request.requestUsuario().telefone(),
                request.requestUsuario().senha(),
                request.requestUsuario().perfilUsuario());

        this.usuarioService.criarUsuario(usuarioRequest, autoEscola.id());
    }
}
