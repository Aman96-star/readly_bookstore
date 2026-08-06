package com.readly.backend.service;

import com.readly.backend.dto.request.BookRequest;
import com.readly.backend.dto.response.BookResponse;
import com.readly.backend.dto.response.PagedBooksResponse;
import com.readly.backend.entity.Book;
import com.readly.backend.entity.Category;
import com.readly.backend.exception.DuplicateResourceException;
import com.readly.backend.exception.ResourceNotFoundException;
import com.readly.backend.repository.BookRepository;
import com.readly.backend.specification.BookSpecifications;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * ============================================================================
 * BookService — business logic behind GET/POST/PUT/DELETE /api/books.
 * ============================================================================
 * getBooks() is the one BookExplorer.tsx calls constantly: it accepts every
 * optional filter from the spec (page, limit, q, category, sort, minPrice,
 * maxPrice, author), builds a dynamic query via BookSpecifications, and
 * returns paginated results in the exact { items, total, page, limit } shape
 * the frontend expects.
 * ============================================================================
 */
@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final CategoryService categoryService;

    public PagedBooksResponse getBooks(int page, int limit, String q, String category,
                                        String sort, BigDecimal minPrice, BigDecimal maxPrice, String author) {

        // Frontend pages are 1-indexed ("page=1" = first page); Spring Data is 0-indexed.
        int pageIndex = Math.max(page - 1, 0);
        int pageSize = limit > 0 ? limit : 12;

        Sort sortOrder = resolveSort(sort);
        PageRequest pageRequest = PageRequest.of(pageIndex, pageSize, sortOrder);

        var specification = BookSpecifications.build(q, category, author, minPrice, maxPrice);
        Page<Book> result = bookRepository.findAll(specification, pageRequest);

        List<BookResponse> items = result.getContent().stream()
                .map(BookResponse::fromEntity)
                .collect(Collectors.toList());

        return PagedBooksResponse.builder()
                .items(items)
                .total(result.getTotalElements())
                .page(page)
                .limit(pageSize)
                .build();
    }

    /**
     * Translates a friendly sort keyword from the query string into a JPA Sort.
     * Supports: price_asc, price_desc, rating_desc, newest (default), title_asc.
     */
    private Sort resolveSort(String sort) {
        if (sort == null) return Sort.by(Sort.Direction.DESC, "createdAt");
        return switch (sort) {
            case "price_asc" -> Sort.by(Sort.Direction.ASC, "price");
            case "price_desc" -> Sort.by(Sort.Direction.DESC, "price");
            case "rating_desc" -> Sort.by(Sort.Direction.DESC, "rating");
            case "title_asc" -> Sort.by(Sort.Direction.ASC, "title");
            case "newest" -> Sort.by(Sort.Direction.DESC, "createdAt");
            default -> Sort.by(Sort.Direction.DESC, "createdAt");
        };
    }

    public BookResponse getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        return BookResponse.fromEntity(book);
    }

    @Transactional
    public BookResponse createBook(BookRequest request) {
        String slug = (request.getSlug() == null || request.getSlug().isBlank())
                ? toSlug(request.getTitle())
                : toSlug(request.getSlug());

        if (bookRepository.existsBySlug(slug)) {
            throw new DuplicateResourceException("A book with slug '" + slug + "' already exists");
        }

        Book book = Book.builder()
                .title(request.getTitle())
                .slug(slug)
                .author(request.getAuthor())
                .description(request.getDescription())
                .price(request.getPrice())
                .currency(request.getCurrency() != null ? request.getCurrency() : "USD")
                .stock(request.getStock())
                .rating(request.getRating() != null ? request.getRating() : 0.0)
                .reviewsCount(request.getReviewsCount() != null ? request.getReviewsCount() : 0)
                .publishedAt(request.getPublishedAt())
                .images(request.getImages() != null ? request.getImages() : List.of())
                .categories(resolveCategories(request.getCategories()))
                .build();

        return BookResponse.fromEntity(bookRepository.save(book));
    }

    @Transactional
    public BookResponse updateBook(Long id, BookRequest request) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));

        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setDescription(request.getDescription());
        book.setPrice(request.getPrice());
        if (request.getCurrency() != null) book.setCurrency(request.getCurrency());
        book.setStock(request.getStock());
        if (request.getRating() != null) book.setRating(request.getRating());
        if (request.getReviewsCount() != null) book.setReviewsCount(request.getReviewsCount());
        book.setPublishedAt(request.getPublishedAt());
        if (request.getImages() != null) book.setImages(request.getImages());
        if (request.getCategories() != null) book.setCategories(resolveCategories(request.getCategories()));

        // Only touch the slug if the admin explicitly supplied a new one.
        if (request.getSlug() != null && !request.getSlug().isBlank()) {
            String newSlug = toSlug(request.getSlug());
            if (!newSlug.equals(book.getSlug()) && bookRepository.existsBySlug(newSlug)) {
                throw new DuplicateResourceException("A book with slug '" + newSlug + "' already exists");
            }
            book.setSlug(newSlug);
        }

        return BookResponse.fromEntity(bookRepository.save(book));
    }

    @Transactional
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new ResourceNotFoundException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
    }

    private Set<Category> resolveCategories(List<String> categoryNames) {
        if (categoryNames == null) return new HashSet<>();
        return categoryNames.stream()
                .map(categoryService::resolveOrCreate)
                .collect(Collectors.toSet());
    }

    private String toSlug(String input) {
        return input.trim().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }
}
