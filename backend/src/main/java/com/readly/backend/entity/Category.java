package com.readly.backend.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Category — maps to the "categories" table (e.g. "Fiction", "Sci-Fi").
 * A Book can belong to many Categories, and a Category can have many Books
 * (see the @ManyToMany mapping on Book.java).
 * Backs GET /api/categories used by BookExplorer.tsx filters.
 */
@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    // URL-friendly identifier, e.g. "science-fiction"
    @Column(nullable = false, unique = true)
    private String slug;
}
