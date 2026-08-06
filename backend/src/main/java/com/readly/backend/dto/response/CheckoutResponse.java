package com.readly.backend.dto.response;

import lombok.*;

/** Response for POST /api/orders/checkout — matches spec: { orderId, status, paymentUrl } */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CheckoutResponse {
    private Long orderId;
    private String status;
    // null here since no external payment gateway is wired up yet — plug in
    // Razorpay/Stripe/PayPal in OrderService.checkout() and populate this
    // with the redirect URL they give you.
    private String paymentUrl;
}
