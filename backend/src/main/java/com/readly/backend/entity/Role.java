package com.readly.backend.entity;

/**
 * Role — the two access levels in this system.
 * USER  -> can browse books, manage their own cart/orders.
 * ADMIN -> can additionally create/update/delete books and view admin stats.
 * Stored as a plain string in the "users" table (see @Enumerated in User.java).
 */
public enum Role {
    USER,
    ADMIN
}
