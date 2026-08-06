package com.readly.backend.repository;

import com.readly.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.math.BigDecimal;
import java.util.List;

/** OrderRepository — CRUD plus "order history for a given user" lookup. */
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

    /** Sums totalAmount across every order — backs the admin revenue stat. Null-safe via COALESCE. */
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o")
    BigDecimal sumTotalRevenue();
}
