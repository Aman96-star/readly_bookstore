package com.readly.backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

/** Body for POST /api/auth/register — matches spec: { name, email, password } */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}
