package com.readly.backend.dto.response;

import com.readly.backend.entity.Book;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/** Response shape for a single Book — matches spec section 5's "Book object". */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BookResponse {
    private Long id;
    private String title;
    private String slug;
    private String author;
    private String description;
    private BigDecimal price;
    private String currency;
    private List<String> images;
    private List<String> categories;
    private Integer stock;
    private Double rating;
    private Integer reviewsCount;
    private LocalDate publishedAt;

    public static BookResponse fromEntity(Book b) {
        return BookResponse.builder()
                .id(b.getId())
                .title(b.getTitle())
                .slug(b.getSlug())
                .author(b.getAuthor())
                .description(b.getDescription())
                .price(b.getPrice())
                .currency(b.getCurrency())
                .images(b.getImages())
                .categories(b.getCategories().stream()
                        .map(c -> c.getName())
                        .collect(Collectors.toList()))
                .stock(b.getStock())
                .rating(b.getRating())
                .reviewsCount(b.getReviewsCount())
                .publishedAt(b.getPublishedAt())
                .build();
    }
}
