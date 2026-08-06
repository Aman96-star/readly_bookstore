package com.readly.backend.repository;

import com.readly.backend.entity.Cart;
import com.readly.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/** CartRepository — each User has exactly one Cart; find it by the owning user. */
public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUser(User user);

    Optional<Cart> findByUserId(Long userId);
}
