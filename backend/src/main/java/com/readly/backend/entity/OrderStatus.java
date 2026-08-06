package com.readly.backend.entity;

/**
 * OrderStatus — lifecycle states of an Order, from checkout to delivery.
 * PENDING   -> order created, payment not yet confirmed
 * PAID      -> payment confirmed
 * SHIPPED   -> order has left the warehouse
 * DELIVERED -> customer received the order
 * CANCELLED -> order was cancelled (by user or admin)
 */
public enum OrderStatus {
    PENDING,
    PAID,
    SHIPPED,
    DELIVERED,
    CANCELLED
}
