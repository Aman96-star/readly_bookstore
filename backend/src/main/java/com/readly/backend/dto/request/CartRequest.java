package com.readly.backend.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import java.util.List;

/**
 * Body for POST /api/cart (save/replace server-side cart) and
 * PUT /api/cart/:cartId (update quantities).
 * Matches spec's Cart payload: { userId (optional, taken from JWT instead), items }
 */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CartRequest {

    @NotEmpty(message = "items cannot be empty")
    @Valid
    private List<CartItemRequest> items;
}
