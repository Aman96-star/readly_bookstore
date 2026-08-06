package com.readly.backend.service;

import com.readly.backend.dto.response.CategoryResponse;
import com.readly.backend.entity.Category;
import com.readly.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/** CategoryService — backs GET /api/categories, and resolveOrCreate() used by BookService. */
@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(CategoryResponse::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Used internally when creating/updating a Book: given a category name
     * typed by the admin (e.g. "Science Fiction"), find the existing
     * Category row or create a new one on the fly, so admins don't have to
     * pre-create categories through a separate screen first.
     */
    public Category resolveOrCreate(String nameOrSlug) {
        return categoryRepository.findByNameIgnoreCase(nameOrSlug)
                .orElseGet(() -> categoryRepository.save(
                        Category.builder()
                                .name(nameOrSlug)
                                .slug(toSlug(nameOrSlug))
                                .build()
                ));
    }

    private String toSlug(String input) {
        return input.trim().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }
}
