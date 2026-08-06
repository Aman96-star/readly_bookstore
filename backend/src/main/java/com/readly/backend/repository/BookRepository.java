package com.readly.backend.repository;

import com.readly.backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.Optional;

/**
 * BookRepository — the main data-access point for books.
 * Extends JpaSpecificationExecutor so BookService can build dynamic
 * WHERE clauses at runtime (search text + category + author + price range,
 * any combination of which may or may not be present) — see
 * specification/BookSpecifications.java for how those filters are composed.
 */
public interface BookRepository extends JpaRepository<Book, Long>, JpaSpecificationExecutor<Book> {

    Optional<Book> findBySlug(String slug);

    boolean existsBySlug(String slug);
}
