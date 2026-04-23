package br.com.controlecfc.exception;

import org.springframework.http.HttpStatus;

public class RecursoNaoEncontradoException extends NegocioException{

    public RecursoNaoEncontradoException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }

}
