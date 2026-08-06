package com.readly.backend.controller;

import com.readly.backend.dto.response.CategoryResponse;
import com.readly.backend.dto.response.PagedBooksResponse;
import com.readly.backend.service.BookService;
import com.readly.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * SearchController — GET /api/search?q=...&limit=5 (public).
 * Backs Navbar.tsx's debounced search box: reuses BookService's filtering
 * under the hood, and also returns matching category names so the frontend
 * can show "search in Fiction" style suggestions.
 */
@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

    private final BookService bookService;
    private final CategoryService categoryService;

    @GetMapping
    public Map<String, Object> search(@RequestParam String q, @RequestParam(defaultValue = "5") int limit) {
        PagedBooksResponse booksPage = bookService.getBooks(1, limit, q, null, null, null, null, null);

        List<CategoryResponse> matchingCategories = categoryService.getAllCategories().stream()
                .filter(c -> c.getName().toLowerCase().contains(q.toLowerCase()))
                .toList();

        return Map.of(
                "books", booksPage.getItems(),
                "categories", matchingCategories
        );
    }
}
