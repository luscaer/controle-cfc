package br.com.controlecfc.service;

import java.util.EnumSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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
    public void registro(RegistroContaRequestDTO request) {
        Set<PerfilUsuario> perfisPermitidos = EnumSet.of(PerfilUsuario.ADMINISTRADOR, PerfilUsuario.INSTRUTOR);
        validarPerfil(request.requestUsuario().perfilUsuario(), perfisPermitidos);

        executarFluxoDeRegistro(request);;
    }

    @Transactional
    public void superRegistro(RegistroContaRequestDTO request) {
        executarFluxoDeRegistro(request);
    }

    private void executarFluxoDeRegistro(RegistroContaRequestDTO request) {
        AutoEscolaResponseDTO autoEscola = this.autoEscolaService.criarAutoEscola(request.requestAutoEscola());

        UsuarioRequestDTO usuarioRequest = new UsuarioRequestDTO(
                request.requestUsuario().nome(),
                request.requestUsuario().email(),
                request.requestUsuario().senha(),
                request.requestUsuario().perfilUsuario());

        this.usuarioService.criarUsuario(usuarioRequest, autoEscola.id());
    }

    private void validarPerfil(PerfilUsuario perfil, Set<PerfilUsuario> permitidos) {
        if (!permitidos.contains(perfil)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Perfil não permitido");
        }
    }

}
