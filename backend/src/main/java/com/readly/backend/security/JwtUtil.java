package com.readly.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * ============================================================================
 * JwtUtil — creates and validates the JSON Web Tokens used for stateless auth.
 * ============================================================================
 * Flow recap:
 *  1) User logs in -> AuthService verifies password -> JwtUtil.generateToken()
 *     -> token sent back to frontend in AuthResponse.
 *  2) Frontend stores the token (store/store.tsx) and sends it on every
 *     future request as header: Authorization: Bearer <token>.
 *  3) JwtAuthFilter (below) reads that header on each request, calls
 *     JwtUtil.validateToken()/extractEmail() to identify the user, and tells
 *     Spring Security "this request is authenticated as this user".
 *
 * No session/cookie state is kept on the server — everything needed to
 * verify the request is inside the token itself. That's what "stateless"
 * auth means.
 * ============================================================================
 */
@Component
public class JwtUtil {

    private final SecretKey signingKey;
    private final long expirationMs;

    public JwtUtil(@Value("${jwt.secret}") String secret,
                    @Value("${jwt.expiration-ms}") long expirationMs) {
        // HMAC-SHA256 requires the key to be derived from raw bytes of the secret.
        this.signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    /** Builds a signed JWT carrying the user's email (subject) and role (custom claim). */
    public String generateToken(String email, String role) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    /** Extracts the email (subject) embedded in the token. */
    public String extractEmail(String token) {
        return parseClaims(token).getSubject();
    }

    /** Extracts the role custom claim embedded in the token. */
    public String extractRole(String token) {
        return parseClaims(token).get("role", String.class);
    }

    /** Returns true if the token's signature is valid and it hasn't expired. */
    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // Covers: expired, malformed, unsupported, or bad-signature tokens.
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
