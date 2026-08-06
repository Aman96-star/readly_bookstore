package com.readly.backend.exception;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

/** Uniform error body every failed request gets back, easy for the frontend to parse. */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ApiError {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    // Populated only for @Valid validation failures — field-by-field messages.
    private List<String> details;
}
