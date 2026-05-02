package br.com.controlecfc.exception;

import org.springframework.http.HttpStatus;

public class TokenRecuperacaoInvalidoException extends NegocioException {

    public TokenRecuperacaoInvalidoException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }

}
