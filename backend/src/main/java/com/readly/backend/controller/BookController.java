package com.readly.backend.controller;

import com.readly.backend.dto.request.BookRequest;
import com.readly.backend.dto.response.BookResponse;
import com.readly.backend.dto.response.PagedBooksResponse;
import com.readly.backend.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

/**
 * BookController — /api/books/*
 * GET endpoints are public (browsing the catalog needs no login); the
 * mutating endpoints are admin-only (enforced centrally in SecurityConfig,
 * not repeated here with @PreAuthorize — keeps the security policy in ONE
 * place, which is easier to audit).
 */
@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    /**
     * GET /api/books?page=1&limit=12&q=...&category=...&sort=...&minPrice=...&maxPrice=...&author=...
     * All query params are optional — this single endpoint powers BookExplorer.tsx's
     * listing, filtering, sorting, and pagination.
     */
    @GetMapping
    public ResponseEntity<PagedBooksResponse> getBooks(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int limit,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String author) {

        return ResponseEntity.ok(bookService.getBooks(page, limit, q, category, sort, minPrice, maxPrice, author));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> getBookById(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    @PostMapping
    public ResponseEntity<BookResponse> createBook(@Valid @RequestBody BookRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.createBook(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookResponse> updateBook(@PathVariable Long id, @Valid @RequestBody BookRequest request) {
        return ResponseEntity.ok(bookService.updateBook(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
