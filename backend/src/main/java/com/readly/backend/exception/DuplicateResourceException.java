package com.readly.backend.exception;

/** Thrown for uniqueness conflicts (e.g. email already registered) — mapped to HTTP 409. */
public class DuplicateResourceException extends RuntimeException {
    public DuplicateResourceException(String message) {
        super(message);
    }
}
