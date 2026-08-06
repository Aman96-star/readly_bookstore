package com.readly.backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

/** A single { bookId, qty } line used inside cart/checkout requests. */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CartItemRequest {

    @NotNull(message = "bookId is required")
    private Long bookId;

    @NotNull(message = "qty is required")
    @Min(value = 1, message = "qty must be at least 1")
    private Integer qty;
}
