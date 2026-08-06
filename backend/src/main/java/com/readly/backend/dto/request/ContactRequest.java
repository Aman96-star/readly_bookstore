package com.readly.backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

/** Body for POST /api/contact — matches spec: { name, email, message } */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ContactRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Message is required")
    @Size(max = 2000, message = "Message is too long")
    private String message;
}
