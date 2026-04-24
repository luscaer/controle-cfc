package br.com.controlecfc.exception;

import org.springframework.http.HttpStatus;

public abstract class NegocioException extends RuntimeException {

    private final HttpStatus status;

    public NegocioException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }

}
