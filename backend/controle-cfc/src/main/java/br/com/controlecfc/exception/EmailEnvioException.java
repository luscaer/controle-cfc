package br.com.controlecfc.exception;

import org.springframework.http.HttpStatus;

public class EmailEnvioException extends NegocioException {

    public EmailEnvioException(String message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
