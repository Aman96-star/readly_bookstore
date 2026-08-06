package com.readly.backend.controller;

import com.readly.backend.dto.request.CheckoutRequest;
import com.readly.backend.dto.response.CheckoutResponse;
import com.readly.backend.dto.response.OrderResponse;
import com.readly.backend.entity.User;
import com.readly.backend.service.OrderService;
import com.readly.backend.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** OrderController — /api/orders/* (all endpoints require a valid JWT). */
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/checkout")
    public ResponseEntity<CheckoutResponse> checkout(@Valid @RequestBody CheckoutRequest request) {
        User user = SecurityUtil.getCurrentUser();
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.checkout(user, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable Long id) {
        User user = SecurityUtil.getCurrentUser();
        return ResponseEntity.ok(orderService.getOrderById(user, id));
    }

    /** GET /api/orders — order history for the logged-in user (spec's "GET /api/orders?userId="; userId comes from the token instead). */
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getOrderHistory() {
        User user = SecurityUtil.getCurrentUser();
        return ResponseEntity.ok(orderService.getOrderHistory(user));
    }
}
