package com.readly.backend.dto.response;

import lombok.*;

/** One row of the admin "top selling books" list. */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TopBookResponse {
    private Long bookId;
    private String title;
    private Long unitsSold;
}
