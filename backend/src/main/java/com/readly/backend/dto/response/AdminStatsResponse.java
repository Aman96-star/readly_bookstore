package com.readly.backend.dto.response;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;

/** Response for GET /api/admin/stats — matches spec: orders count, revenue, top books. */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AdminStatsResponse {
    private long totalOrders;
    private BigDecimal totalRevenue;
    private long totalBooks;
    private long totalUsers;
    private List<TopBookResponse> topBooks;
}
