package com.readly.backend.dto.response;

import com.readly.backend.entity.User;
import lombok.*;

/** Safe, public-facing view of a User — password hash is deliberately excluded. */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String role;

    public static UserResponse fromEntity(User u) {
        return UserResponse.builder()
                .id(u.getId())
                .name(u.getName())
                .email(u.getEmail())
                .role(u.getRole().name())
                .build();
    }
}
