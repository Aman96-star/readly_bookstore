package com.readly.backend.repository;

import com.readly.backend.entity.OrderItem;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

/**
 * OrderItemRepository — mainly used by AdminService to work out best-selling
 * books (see the custom @Query for top books by quantity sold).
 */
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrderId(Long orderId);

    /**
     * Groups all order line items by book and sums quantities sold, ordered
     * highest-first. Returns raw Object[] rows: [0]=bookId, [1]=title, [2]=unitsSold.
     * Pageable is used here purely to limit the result count (e.g. top 5).
     */
    @Query("""
           SELECT oi.book.id, oi.book.title, SUM(oi.qty)
           FROM OrderItem oi
           GROUP BY oi.book.id, oi.book.title
           ORDER BY SUM(oi.qty) DESC
           """)
    List<Object[]> findTopSellingBooks(Pageable pageable);
}
