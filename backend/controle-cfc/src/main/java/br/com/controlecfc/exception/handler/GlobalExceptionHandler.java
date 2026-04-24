package br.com.controlecfc.exception.handler;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.com.controlecfc.dto.erro.ErroResponseDTO;
import br.com.controlecfc.exception.NegocioException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(NegocioException.class)
    public ResponseEntity<ErroResponseDTO> handleNegocio(NegocioException exception) {
        ErroResponseDTO erro = new ErroResponseDTO(exception.getStatus().value(), exception.getMessage(), LocalDateTime.now());
        return ResponseEntity.status(exception.getStatus()).body(erro);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErroResponseDTO> handleGenerico(Exception exception) {
        ErroResponseDTO erro = new ErroResponseDTO(500, "Erro interno do servidor.", LocalDateTime.now());
        logger.error("Erro inesperado", exception);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
    }

}
