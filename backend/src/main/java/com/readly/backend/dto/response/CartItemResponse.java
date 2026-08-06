package com.readly.backend.dto.response;

import com.readly.backend.entity.CartItem;
import lombok.*;
import java.math.BigDecimal;

/** One line item as returned inside a CartResponse. */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CartItemResponse {
    private Long itemId;
    private Long bookId;
    private String title;
    private String imageUrl;
    private Integer qty;
    private BigDecimal priceAtAdd;
    private BigDecimal lineTotal;

    public static CartItemResponse fromEntity(CartItem ci) {
        BigDecimal lineTotal = ci.getPriceAtAdd().multiply(BigDecimal.valueOf(ci.getQty()));
        return CartItemResponse.builder()
                .itemId(ci.getId())
                .bookId(ci.getBook().getId())
                .title(ci.getBook().getTitle())
                .imageUrl(ci.getBook().getImages().isEmpty() ? null : ci.getBook().getImages().get(0))
                .qty(ci.getQty())
                .priceAtAdd(ci.getPriceAtAdd())
                .lineTotal(lineTotal)
                .build();
    }
}
