-- ============================================================================
-- seed-data.sql — OPTIONAL sample data for local testing.
-- ============================================================================
-- Run this AFTER starting the backend at least once (so Hibernate has
-- already created the tables via ddl-auto=update). Run it with:
--   mysql -u root -p readly_db < scripts/seed-data.sql
-- ============================================================================

INSERT INTO categories (name, slug) VALUES
  ('Fiction', 'fiction'),
  ('Non-Fiction', 'non-fiction'),
  ('Science Fiction', 'science-fiction'),
  ('Mystery', 'mystery'),
  ('Technology', 'technology');

INSERT INTO books (title, slug, author, description, price, currency, stock, rating, reviews_count, published_at, created_at, updated_at) VALUES
  ('The Silent Orbit', 'the-silent-orbit', 'Amara Chen', 'A gripping sci-fi thriller set on a derelict space station.', 14.99, 'USD', 25, 4.5, 120, '2023-03-14', NOW(), NOW()),
  ('Whispers in the Archive', 'whispers-in-the-archive', 'Daniel Ford', 'A mystery unraveling secrets buried in an old university library.', 12.50, 'USD', 18, 4.2, 87, '2022-11-02', NOW(), NOW()),
  ('Clean Code, Clean Mind', 'clean-code-clean-mind', 'Priya Nair', 'Practical software craftsmanship lessons for working developers.', 22.00, 'USD', 40, 4.8, 340, '2021-06-19', NOW(), NOW());

-- Link books to categories (adjust IDs if your auto-increment values differ)
INSERT INTO book_categories (book_id, category_id) VALUES
  (1, 3), -- The Silent Orbit -> Science Fiction
  (2, 4), -- Whispers in the Archive -> Mystery
  (3, 5); -- Clean Code, Clean Mind -> Technology

INSERT INTO book_images (book_id, image_url) VALUES
  (1, 'https://via.placeholder.com/400x600?text=The+Silent+Orbit'),
  (2, 'https://via.placeholder.com/400x600?text=Whispers+in+the+Archive'),
  (3, 'https://via.placeholder.com/400x600?text=Clean+Code+Clean+Mind');

-- ============================================================================
-- To create an ADMIN user:
--   1) Register normally through POST /api/auth/register (creates role=USER)
--   2) Then promote that account with:
--        UPDATE users SET role = 'ADMIN' WHERE email = 'youradmin@example.com';
-- This avoids needing to hand-craft a BCrypt password hash in raw SQL.
-- ============================================================================
