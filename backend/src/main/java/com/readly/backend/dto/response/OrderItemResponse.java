package com.readly.backend.dto.response;

import com.readly.backend.entity.OrderItem;
import lombok.*;
import java.math.BigDecimal;

/** One purchased line item as returned inside an OrderResponse. */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OrderItemResponse {
    private Long bookId;
    private String title;
    private Integer qty;
    private BigDecimal price;

    public static OrderItemResponse fromEntity(OrderItem oi) {
        return OrderItemResponse.builder()
                .bookId(oi.getBook().getId())
                .title(oi.getBook().getTitle())
                .qty(oi.getQty())
                .price(oi.getPrice())
                .build();
    }
}
