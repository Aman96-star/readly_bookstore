package com.readly.backend.exception;

/** Thrown for bad login credentials — mapped to HTTP 401. */
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}
