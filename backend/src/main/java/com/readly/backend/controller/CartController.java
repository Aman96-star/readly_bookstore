package com.readly.backend.controller;

import com.readly.backend.dto.request.CartRequest;
import com.readly.backend.dto.response.CartResponse;
import com.readly.backend.entity.User;
import com.readly.backend.service.CartService;
import com.readly.backend.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * CartController — /api/cart/*  (all endpoints require a valid JWT).
 * The current user is always resolved from the token via SecurityUtil —
 * never trusted from the request body — so nobody can view or modify
 * another user's cart by guessing an id.
 */
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<CartResponse> saveCart(@Valid @RequestBody CartRequest request) {
        User user = SecurityUtil.getCurrentUser();
        return ResponseEntity.ok(cartService.saveCart(user, request));
    }

    /** GET /api/cart — returns the logged-in user's own cart (token identifies "which user"). */
    @GetMapping
    public ResponseEntity<CartResponse> getCart() {
        User user = SecurityUtil.getCurrentUser();
        return ResponseEntity.ok(cartService.getCart(user));
    }

    @PutMapping("/{cartId}")
    public ResponseEntity<CartResponse> updateCart(@PathVariable Long cartId, @Valid @RequestBody CartRequest request) {
        User user = SecurityUtil.getCurrentUser();
        return ResponseEntity.ok(cartService.updateCart(user, cartId, request));
    }

    @DeleteMapping("/{cartId}/items/{itemId}")
    public ResponseEntity<CartResponse> deleteItem(@PathVariable Long cartId, @PathVariable Long itemId) {
        User user = SecurityUtil.getCurrentUser();
        return ResponseEntity.ok(cartService.deleteItem(user, cartId, itemId));
    }
}
