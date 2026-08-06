package com.readly.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * ============================================================================
 * User — maps to the "users" table.
 * ============================================================================
 * Represents anyone who registers on the storefront (POST /api/auth/register)
 * — either a regular customer (Role.USER) or an admin (Role.ADMIN).
 *
 * Frontend link: this is what backs Navbar.tsx's auth state and store.tsx's
 * user token/profile.
 * ============================================================================
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // Emails must be unique — enforced at the DB level too.
    @Column(nullable = false, unique = true)
    private String email;

    // NEVER store plain text passwords. This holds a BCrypt hash
    // (see PasswordEncoder bean in SecurityConfig + AuthService).
    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Role role = Role.USER;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
