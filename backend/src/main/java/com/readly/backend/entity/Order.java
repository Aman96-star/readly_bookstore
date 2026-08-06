package com.readly.backend.entity;

import com.readly.backend.entity.embeddable.Address;
import com.readly.backend.entity.embeddable.PaymentInfo;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * ============================================================================
 * Order — maps to the "orders" table. Created by POST /api/orders/checkout.
 * ============================================================================
 * Matches the "Order payload" shape from the frontend spec (section 5):
 *   { userId, items, billing, shipping, payment }
 * plus server-computed fields: totalAmount, status, createdAt.
 * ============================================================================
 */
@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();

    // Embedded twice with different column prefixes so both addresses live
    // as flat columns on the "orders" table (billing_name, shipping_name, ...).
    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "name", column = @Column(name = "billing_name")),
        @AttributeOverride(name = "addressLine", column = @Column(name = "billing_address_line")),
        @AttributeOverride(name = "city", column = @Column(name = "billing_city")),
        @AttributeOverride(name = "zip", column = @Column(name = "billing_zip")),
        @AttributeOverride(name = "country", column = @Column(name = "billing_country"))
    })
    private Address billing;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "name", column = @Column(name = "shipping_name")),
        @AttributeOverride(name = "addressLine", column = @Column(name = "shipping_address_line")),
        @AttributeOverride(name = "city", column = @Column(name = "shipping_city")),
        @AttributeOverride(name = "zip", column = @Column(name = "shipping_zip")),
        @AttributeOverride(name = "country", column = @Column(name = "shipping_country"))
    })
    private Address shipping;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "method", column = @Column(name = "payment_method")),
        @AttributeOverride(name = "transactionId", column = @Column(name = "payment_transaction_id"))
    })
    private PaymentInfo payment;

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private OrderStatus status = OrderStatus.PENDING;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
