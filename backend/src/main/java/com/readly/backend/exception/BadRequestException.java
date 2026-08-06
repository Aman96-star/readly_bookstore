package com.readly.backend.exception;

/** Thrown for invalid business input that isn't a simple validation failure — mapped to HTTP 400. */
public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}
