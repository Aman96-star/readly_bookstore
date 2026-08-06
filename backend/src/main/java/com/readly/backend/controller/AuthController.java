package com.readly.backend.controller;

import com.readly.backend.dto.request.LoginRequest;
import com.readly.backend.dto.request.RegisterRequest;
import com.readly.backend.dto.response.AuthResponse;
import com.readly.backend.dto.response.UserResponse;
import com.readly.backend.service.AuthService;
import com.readly.backend.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController — /api/auth/*
 * Maps 1:1 to spec section 4 "Auth". register/login are public; /me requires
 * a valid JWT (enforced by SecurityConfig's anyRequest().authenticated() rule).
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me() {
        return ResponseEntity.ok(UserResponse.fromEntity(SecurityUtil.getCurrentUser()));
    }
}
