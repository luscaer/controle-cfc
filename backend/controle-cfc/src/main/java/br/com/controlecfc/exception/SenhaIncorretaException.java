package br.com.controlecfc.exception;

import org.springframework.http.HttpStatus;

public class SenhaIncorretaException extends NegocioException {

    public SenhaIncorretaException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }

}
