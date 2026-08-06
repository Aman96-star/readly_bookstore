package com.readly.backend.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.util.List;

/**
 * Body for POST /api/orders/checkout.
 * Matches spec: { userId, cartItems, billingInfo, shippingInfo, paymentMethod }
 * (userId is taken from the JWT rather than trusted from the client body).
 */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CheckoutRequest {

    @NotEmpty(message = "cartItems cannot be empty")
    @Valid
    private List<CartItemRequest> cartItems;

    @Valid
    @NotNull(message = "billingInfo is required")
    private AddressRequest billingInfo;

    @Valid
    @NotNull(message = "shippingInfo is required")
    private AddressRequest shippingInfo;

    @NotBlank(message = "paymentMethod is required")
    private String paymentMethod;
}
