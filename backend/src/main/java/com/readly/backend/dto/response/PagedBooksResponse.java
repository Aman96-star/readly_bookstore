package com.readly.backend.dto.response;

import lombok.*;
import java.util.List;

/**
 * Response shape for GET /api/books — matches spec exactly:
 *   { items: [Book], total, page, limit }
 */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PagedBooksResponse {
    private List<BookResponse> items;
    private long total;
    private int page;
    private int limit;
}
