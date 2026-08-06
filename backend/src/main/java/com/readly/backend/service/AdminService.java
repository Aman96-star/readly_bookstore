package com.readly.backend.service;

import com.readly.backend.dto.response.AdminStatsResponse;
import com.readly.backend.dto.response.TopBookResponse;
import com.readly.backend.repository.BookRepository;
import com.readly.backend.repository.OrderItemRepository;
import com.readly.backend.repository.OrderRepository;
import com.readly.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * AdminService — backs GET /api/admin/stats (admin-only dashboard numbers).
 * Aggregates: total orders, total revenue, total books/users in catalog,
 * and a top-5 best-selling books list by units sold.
 */
@Service
@RequiredArgsConstructor
public class AdminService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public AdminStatsResponse getStats() {
        List<Object[]> topRows = orderItemRepository.findTopSellingBooks(PageRequest.of(0, 5));

        List<TopBookResponse> topBooks = topRows.stream()
                .map(row -> TopBookResponse.builder()
                        .bookId((Long) row[0])
                        .title((String) row[1])
                        .unitsSold((Long) row[2])
                        .build())
                .collect(Collectors.toList());

        return AdminStatsResponse.builder()
                .totalOrders(orderRepository.count())
                .totalRevenue(orderRepository.sumTotalRevenue())
                .totalBooks(bookRepository.count())
                .totalUsers(userRepository.count())
                .topBooks(topBooks)
                .build();
    }
}
