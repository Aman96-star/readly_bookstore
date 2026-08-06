package com.readly.backend.repository;

import com.readly.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * UserRepository — Spring Data JPA auto-implements this interface at runtime.
 * You get save(), findById(), findAll(), delete() etc. for free from
 * JpaRepository; below we add one custom finder Spring generates from the
 * method name alone (no SQL needed): "findByEmail" -> WHERE email = ?.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
