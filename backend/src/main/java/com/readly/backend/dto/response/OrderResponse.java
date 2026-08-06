package com.readly.backend.dto.response;

import com.readly.backend.entity.Order;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Response shape for order endpoints — matches spec: { orderId, status, ... }
 * plus items/billing/shipping/payment/totalAmount/createdAt for full detail.
 */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OrderResponse {
    private Long orderId;
    private String status;
    private List<OrderItemResponse> items;
    private AddressResponse billing;
    private AddressResponse shipping;
    private String paymentMethod;
    private BigDecimal totalAmount;
    private LocalDateTime createdAt;

    public static OrderResponse fromEntity(Order o) {
        return OrderResponse.builder()
                .orderId(o.getId())
                .status(o.getStatus().name())
                .items(o.getItems().stream().map(OrderItemResponse::fromEntity).collect(Collectors.toList()))
                .billing(AddressResponse.fromEntity(o.getBilling()))
                .shipping(AddressResponse.fromEntity(o.getShipping()))
                .paymentMethod(o.getPayment() != null ? o.getPayment().getMethod() : null)
                .totalAmount(o.getTotalAmount())
                .createdAt(o.getCreatedAt())
                .build();
    }
}
