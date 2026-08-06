package com.readly.backend.repository;

import com.readly.backend.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/** CartItemRepository — used to look up / delete a single line item inside a cart. */
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCartIdAndBookId(Long cartId, Long bookId);

    void deleteByCartIdAndId(Long cartId, Long itemId);
}
