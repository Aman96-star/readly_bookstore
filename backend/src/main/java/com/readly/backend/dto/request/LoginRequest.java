package com.readly.backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

/** Body for POST /api/auth/login — matches spec: { email, password } */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;
}
