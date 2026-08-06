package com.readly.backend.dto.response;

import lombok.*;

/** Response for register/login — matches spec: { user, token } */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AuthResponse {
    private UserResponse user;
    private String token;
}
