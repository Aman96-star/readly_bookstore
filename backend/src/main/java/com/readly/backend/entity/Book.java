package com.readly.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * ============================================================================
 * Book — maps to the "books" table. This is the core entity of the whole app.
 * ============================================================================
 * Mirrors the "Book object" JSON shape from the frontend spec (section 5):
 *   { id, title, slug, author, description, price, currency, images,
 *     categories, stock, rating, reviewsCount, publishedAt }
 *
 * Frontend link: replaces the static data/books.ts sample data once
 * services/api_calls.tsx points at this backend.
 * ============================================================================
 */
@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    // URL-friendly identifier used for pretty routes like /books/the-hobbit
    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String author;

    @Column(length = 4000)
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Builder.Default
    @Column(nullable = false)
    private String currency = "USD";

    @Builder.Default
    @Column(nullable = false)
    private Integer stock = 0;

    @Builder.Default
    private Double rating = 0.0;

    @Builder.Default
    @Column(name = "reviews_count")
    private Integer reviewsCount = 0;

    @Column(name = "published_at")
    private LocalDate publishedAt;

    // One book can have several cover/gallery images.
    // Stored in a separate "book_images" table (id, book_id, image_url).
    @ElementCollection
    @CollectionTable(name = "book_images", joinColumns = @JoinColumn(name = "book_id"))
    @Column(name = "image_url")
    @Builder.Default
    private List<String> images = new java.util.ArrayList<>();

    // Many-to-many: a book can belong to several categories, and a category
    // can contain many books. Join table "book_categories" links them.
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "book_categories",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    @Builder.Default
    private Set<Category> categories = new HashSet<>();

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
