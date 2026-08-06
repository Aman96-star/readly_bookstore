package com.readly.backend.util;

import com.readly.backend.entity.User;
import com.readly.backend.security.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * SecurityUtil — small helper so controllers/services don't have to repeat
 * the SecurityContextHolder boilerplate every time they need "who is making
 * this request?" (used for cart, orders, and /api/auth/me).
 */
public class SecurityUtil {

    private SecurityUtil() {}

    public static User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof CustomUserDetails)) {
            throw new IllegalStateException("No authenticated user found in security context");
        }
        return ((CustomUserDetails) auth.getPrincipal()).getUser();
    }
}
