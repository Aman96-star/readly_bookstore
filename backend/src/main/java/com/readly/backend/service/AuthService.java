package com.readly.backend.service;

import com.readly.backend.dto.request.LoginRequest;
import com.readly.backend.dto.request.RegisterRequest;
import com.readly.backend.dto.response.AuthResponse;
import com.readly.backend.dto.response.UserResponse;
import com.readly.backend.entity.Role;
import com.readly.backend.entity.User;
import com.readly.backend.exception.DuplicateResourceException;
import com.readly.backend.exception.UnauthorizedException;
import com.readly.backend.repository.UserRepository;
import com.readly.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * ============================================================================
 * AuthService — business logic behind /api/auth/*.
 * ============================================================================
 * Handles:
 *   - register(): create a new user account (password gets hashed, never
 *                 stored in plain text)
 *   - login():    verify credentials, issue a JWT
 *   - Both return an AuthResponse { user, token } matching the frontend spec.
 * ============================================================================
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("An account with this email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                // BCrypt hash — passwordEncoder.matches() is used later to verify at login.
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        User saved = userRepository.save(user);
        String token = jwtUtil.generateToken(saved.getEmail(), saved.getRole().name());

        return AuthResponse.builder()
                .user(UserResponse.fromEntity(saved))
                .token(token)
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        // passwordEncoder.matches(raw, hashed) re-hashes the raw password with
        // the same salt and compares — never decrypt a stored hash.
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return AuthResponse.builder()
                .user(UserResponse.fromEntity(user))
                .token(token)
                .build();
    }
}
