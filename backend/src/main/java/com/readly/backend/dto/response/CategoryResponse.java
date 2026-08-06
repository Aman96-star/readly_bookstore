package com.readly.backend.dto.response;

import com.readly.backend.entity.Category;
import lombok.*;

/** Response shape for GET /api/categories — matches spec: { id, name, slug } */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CategoryResponse {
    private Long id;
    private String name;
    private String slug;

    public static CategoryResponse fromEntity(Category c) {
        return CategoryResponse.builder()
                .id(c.getId())
                .name(c.getName())
                .slug(c.getSlug())
                .build();
    }
}
