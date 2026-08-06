package com.readly.backend.entity.embeddable;

import jakarta.persistence.Embeddable;
import lombok.*;

/**
 * PaymentInfo — embedded value object storing how an order was paid.
 * method: "card" | "paypal" (kept as a free-text string here; validated at
 * the DTO layer). transactionId: reference returned by a real payment
 * gateway if/when you integrate one (Razorpay/Stripe/PayPal, etc.).
 * NOTE: for a real production app, never store raw card details — this
 * project intentionally only stores a transaction reference, not card data.
 */
@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentInfo {
    private String method;
    private String transactionId;
}
