package com.readly.backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Body for POST /api/books and PUT /api/books/:id (admin only).
 * "categories" here is a list of category names/slugs — the service layer
 * resolves each to an existing Category or creates a new one.
 */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class BookRequest {

    @NotBlank(message = "Title is required")
    private String title;

    // Optional — if blank, BookService auto-generates a slug from the title.
    private String slug;

    @NotBlank(message = "Author is required")
    private String author;

    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Price cannot be negative")
    private BigDecimal price;

    private String currency = "USD";

    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;

    private Double rating;

    private Integer reviewsCount;

    private LocalDate publishedAt;

    private List<String> images;

    private List<String> categories;
}
