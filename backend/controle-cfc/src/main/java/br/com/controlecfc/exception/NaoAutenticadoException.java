package br.com.controlecfc.exception;

import org.springframework.http.HttpStatus;

public class NaoAutenticadoException extends NegocioException {

    public NaoAutenticadoException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }

}
