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

    public RegistroService(AutoEscolaService autoEscolaService, UsuarioService usuarioService) {
        this.autoEscolaService = autoEscolaService;
        this.usuarioService = usuarioService;
    }

    @Transactional
    public void registroInicial(RegistroContaRequestDTO request) {
        AutoEscolaResponseDTO autoEscolaResponse = this.autoEscolaService.criarAutoEscola(request.requestAutoEscola());
        UsuarioRequestDTO usuarioRequest = new UsuarioRequestDTO(
                request.requestUsuario().nome(),
                request.requestUsuario().email(),
                request.requestUsuario().senha(),
                PerfilUsuario.ADMINISTRADOR);

        this.usuarioService.criarUsuario(usuarioRequest, autoEscolaResponse.id());
    }

    @Transactional
    public void superRegistroInicial(RegistroContaRequestDTO request) {
        AutoEscolaResponseDTO autoEscola = this.autoEscolaService.criarAutoEscola(request.requestAutoEscola());

        UsuarioRequestDTO usuarioRequest = new UsuarioRequestDTO(
                request.requestUsuario().nome(),
                request.requestUsuario().email(),
                request.requestUsuario().senha(),
                request.requestUsuario().perfilUsuario());

        this.usuarioService.criarUsuario(usuarioRequest, autoEscola.id());
    }
}
