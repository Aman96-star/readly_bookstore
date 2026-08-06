package com.readly.backend.exception;

/** Thrown when a requested id/slug doesn't exist — mapped to HTTP 404. */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
