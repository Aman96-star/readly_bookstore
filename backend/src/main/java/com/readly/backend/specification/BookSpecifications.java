package com.readly.backend.specification;

import com.readly.backend.entity.Book;
import com.readly.backend.entity.Category;
import org.springframework.data.jpa.domain.Specification;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * ============================================================================
 * BookSpecifications — builds dynamic SQL WHERE clauses for GET /api/books.
 * ============================================================================
 * Why this exists: the frontend can send ANY combination of query params
 * (q, category, author, minPrice, maxPrice) — sometimes all of them,
 * sometimes none. Writing a separate repository method for every combination
 * would be unmanageable. Spring Data's Specification API lets us compose
 * only the filters that are actually present into one query, e.g.:
 *
 *   Specification.where(hasSearch(q)).and(hasCategory(cat)).and(priceBetween(min,max))
 *
 * Each method below returns null when its filter isn't requested — Spring
 * Data automatically skips null Specifications when combining with and/or.
 * ============================================================================
 */
public class BookSpecifications {

    /** Full-text-ish search across title, author, and description. */
    public static Specification<Book> hasSearch(String q) {
        if (q == null || q.isBlank()) return null;
        String like = "%" + q.toLowerCase() + "%";
        return (root, query, cb) -> {
            query.distinct(true);
            return cb.or(
                cb.like(cb.lower(root.get("title")), like),
                cb.like(cb.lower(root.get("author")), like),
                cb.like(cb.lower(root.get("description")), like)
            );
        };
    }

    /** Filters by category name or slug (case-insensitive). */
    public static Specification<Book> hasCategory(String category) {
        if (category == null || category.isBlank()) return null;
        return (root, query, cb) -> {
            query.distinct(true);
            var join = root.join("categories");
            return cb.or(
                cb.equal(cb.lower(join.get("slug")), category.toLowerCase()),
                cb.equal(cb.lower(join.get("name")), category.toLowerCase())
            );
        };
    }

    /** Filters by author name (partial, case-insensitive match). */
    public static Specification<Book> hasAuthor(String author) {
        if (author == null || author.isBlank()) return null;
        String like = "%" + author.toLowerCase() + "%";
        return (root, query, cb) -> cb.like(cb.lower(root.get("author")), like);
    }

    /** Filters by inclusive price range; either bound may be null (open-ended). */
    public static Specification<Book> priceBetween(BigDecimal min, BigDecimal max) {
        if (min == null && max == null) return null;
        return (root, query, cb) -> {
            if (min != null && max != null) {
                return cb.between(root.get("price"), min, max);
            } else if (min != null) {
                return cb.greaterThanOrEqualTo(root.get("price"), min);
            } else {
                return cb.lessThanOrEqualTo(root.get("price"), max);
            }
        };
    }

    /**
     * Combines every non-null filter above into a single Specification.
     * This is the method BookService actually calls.
     */
    public static Specification<Book> build(String q, String category, String author,
                                             BigDecimal minPrice, BigDecimal maxPrice) {
        List<Specification<Book>> specs = new ArrayList<>();
        Specification<Book> s;
        if ((s = hasSearch(q)) != null) specs.add(s);
        if ((s = hasCategory(category)) != null) specs.add(s);
        if ((s = hasAuthor(author)) != null) specs.add(s);
        if ((s = priceBetween(minPrice, maxPrice)) != null) specs.add(s);

        Specification<Book> result = Specification.where(null);
        for (Specification<Book> spec : specs) {
            result = result.and(spec);
        }
        return result;
    }
}
