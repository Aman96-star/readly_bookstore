# Readly Bookstore — Backend (Spring Boot + MySQL)

This is the backend API for the Readly Bookstore Next.js frontend. It implements every endpoint described in the frontend's `Frontend → Backend Spec`, using **Spring Boot 3**, **Spring Security + JWT**, **Spring Data JPA**, and **MySQL**.

---

## 1) Tech stack

| Layer | Technology |
|---|---|
| Language / runtime | Java 17, Spring Boot 3.3.4 |
| Web layer | Spring MVC (`spring-boot-starter-web`) |
| Database access | Spring Data JPA + Hibernate |
| Database | MySQL 8 |
| Auth | Spring Security + JWT (stateless, no sessions) |
| Validation | `spring-boot-starter-validation` (Bean Validation) |
| Boilerplate reduction | Lombok |
| API docs | springdoc-openapi (Swagger UI) |
| Build tool | Maven |

---

## 2) How a request flows through this backend

Every request follows the same path, top to bottom:

```
Next.js frontend (services/api_calls.tsx)
        │  fetch("http://localhost:8080/api/books?...")
        ▼
┌───────────────────────────────────────────────────────┐
│ JwtAuthFilter (security/)                              │  ← reads "Authorization: Bearer <token>"
│   - no token / invalid token → request continues       │    header if present, identifies the user
│     unauthenticated (fine for public endpoints)        │
│   - valid token → SecurityContext now knows "who"      │
└───────────────────────────────────────────────────────┘
        ▼
┌───────────────────────────────────────────────────────┐
│ SecurityConfig (config/)                                │  ← decides: is this route public,
│   permitAll() / hasRole("ADMIN") / authenticated()      │    authenticated-only, or admin-only?
└───────────────────────────────────────────────────────┘
        ▼
┌───────────────────────────────────────────────────────┐
│ Controller (controller/)                                 │  ← thin layer: maps HTTP verb + path to
│   @RestController, e.g. BookController                  │    a Java method, validates @RequestBody
└───────────────────────────────────────────────────────┘
        ▼
┌───────────────────────────────────────────────────────┐
│ Service (service/)                                        │  ← ALL business logic lives here:
│   e.g. BookService, OrderService                         │    stock checks, price snapshots,
│                                                            │    pagination, filtering, etc.
└───────────────────────────────────────────────────────┘
        ▼
┌───────────────────────────────────────────────────────┐
│ Repository (repository/)                                  │  ← Spring Data JPA interfaces;
│   e.g. BookRepository extends JpaRepository               │    no SQL written by hand for
│                                                              │    simple CRUD/lookups
└───────────────────────────────────────────────────────┘
        ▼
┌───────────────────────────────────────────────────────┐
│ MySQL database (readly_db)                                │
└───────────────────────────────────────────────────────┘
        ▲
        │  entity ↔ DTO mapping happens at the service layer
        │  (Book entity never leaves the backend directly —
        │   it's converted to BookResponse first)
```

**Why the DTO layer exists:** entities (`entity/`) map 1:1 to database tables and can carry things you never want to expose (like a user's password hash, or lazy-loaded JPA proxies that break JSON serialization). DTOs (`dto/request/`, `dto/response/`) are the actual JSON shapes the frontend sends and receives — controllers and services convert between the two.

---

## 3) Folder structure

```
readly-backend/
├── pom.xml                          # Maven build file — all dependencies live here
├── docker-compose.yml                # One-command MySQL for local dev
├── scripts/seed-data.sql             # Optional sample books/categories for testing
└── src/main/
    ├── resources/
    │   └── application.properties    # DB connection, JWT secret, CORS, upload dir
    └── java/com/readly/backend/
        ├── ReadlyBackendApplication.java   # Entry point (main method)
        │
        ├── entity/                   # @Entity classes — one per DB table
        │   ├── User.java, Category.java, Book.java
        │   ├── Cart.java, CartItem.java
        │   ├── Order.java, OrderItem.java
        │   ├── ContactMessage.java
        │   ├── Role.java, OrderStatus.java        (enums)
        │   └── embeddable/Address.java, PaymentInfo.java
        │
        ├── repository/                # Spring Data JPA interfaces (data access)
        │   └── UserRepository, BookRepository, CartRepository, ...
        │
        ├── specification/
        │   └── BookSpecifications.java   # Dynamic WHERE-clause builder for
        │                                  # search/category/author/price filters
        │
        ├── dto/
        │   ├── request/               # Shapes the frontend SENDS (validated with @Valid)
        │   └── response/              # Shapes the backend RETURNS
        │
        ├── service/                   # Business logic — the "brain" of each feature
        │   ├── AuthService, BookService, CategoryService
        │   ├── CartService, OrderService
        │   ├── ContactService, UploadService, AdminService
        │
        ├── controller/                 # @RestController classes — one per resource
        │   ├── AuthController      → /api/auth/*
        │   ├── BookController      → /api/books/*
        │   ├── CategoryController  → /api/categories
        │   ├── CartController      → /api/cart/*
        │   ├── OrderController     → /api/orders/*
        │   ├── SearchController    → /api/search
        │   ├── ContactController   → /api/contact
        │   ├── AdminController     → /api/admin/*
        │   └── UploadController    → /api/uploads
        │
        ├── security/                   # JWT machinery
        │   ├── JwtUtil.java                 # generate/validate tokens
        │   ├── JwtAuthFilter.java           # runs on every request
        │   ├── CustomUserDetails.java       # adapts User → Spring Security's model
        │   └── UserDetailsServiceImpl.java  # loads a User by email
        │
        ├── config/
        │   ├── SecurityConfig.java     # THE central file for route access rules
        │   └── WebConfig.java          # serves /uploads/** as static files
        │
        ├── exception/                   # Consistent error handling
        │   ├── GlobalExceptionHandler.java     # catches every thrown exception
        │   ├── ResourceNotFoundException, DuplicateResourceException, ...
        │   └── ApiError.java                    # the JSON error shape returned
        │
        └── util/
            └── SecurityUtil.java        # "who is the currently logged-in user?" helper
```

Every file in the project has comments at the top explaining its role, and inline comments on any non-obvious logic — so you can open any file cold and understand what it's for.

---

## 4) Setup instructions

### Prerequisites
- Java 17+ (`java -version`)
- Maven 3.8+ (`mvn -version`) — or use the included Maven wrapper if you add one
- MySQL 8 running locally, **or** Docker (to use `docker-compose.yml`)

### Step 1 — Start MySQL

**Option A: Docker (easiest)**
```bash
docker compose up -d
```
This starts MySQL 8 on `localhost:3306` with database `readly_db`, user `root`, password `root` — matching `application.properties` exactly.

**Option B: Local MySQL install**
```sql
CREATE DATABASE readly_db;
```
Then update `spring.datasource.username` / `spring.datasource.password` in `application.properties` to match your local MySQL credentials.

### Step 2 — Run the backend
```bash
mvn spring-boot:run
```
On first run, Hibernate (`spring.jpa.hibernate.ddl-auto=update`) automatically creates every table from the `@Entity` classes — you don't need to write any `CREATE TABLE` statements yourself.

The API is now live at **http://localhost:8080**.

### Step 3 — (Optional) load sample data
```bash
mysql -u root -p readly_db < scripts/seed-data.sql
```

### Step 4 — Explore the API
Open **http://localhost:8080/swagger-ui.html** to see and test every endpoint interactively, without needing Postman.

### Step 5 — Connect your Next.js frontend
In your frontend's `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```
Then update `services/api_calls.tsx` to call `${process.env.NEXT_PUBLIC_API_URL}/books`, etc. CORS is already configured (`app.cors.allowed-origins` in `application.properties`) to accept requests from `http://localhost:3000`.

### Creating an admin user
1. Register a normal account via `POST /api/auth/register`.
2. Promote it manually:
   ```sql
   UPDATE users SET role = 'ADMIN' WHERE email = 'youradmin@example.com';
   ```
3. Log in again — the new JWT will carry the `ADMIN` role and unlock `POST/PUT/DELETE /api/books` and `GET /api/admin/stats`.

---

## 5) API reference (matches the frontend spec exactly)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create an account, returns `{ user, token }` |
| POST | `/api/auth/login` | Public | Returns `{ user, token }` |
| GET | `/api/auth/me` | JWT | Returns the logged-in user |
| GET | `/api/books` | Public | Paginated list; query params: `page, limit, q, category, sort, minPrice, maxPrice, author` |
| GET | `/api/books/:id` | Public | Single book |
| POST | `/api/books` | Admin | Create a book |
| PUT | `/api/books/:id` | Admin | Update a book |
| DELETE | `/api/books/:id` | Admin | Delete a book |
| GET | `/api/categories` | Public | List all categories |
| GET | `/api/search?q=...&limit=5` | Public | Books + categories matching `q` |
| GET | `/api/cart` | JWT | Current user's cart |
| POST | `/api/cart` | JWT | Save/replace cart contents |
| PUT | `/api/cart/:cartId` | JWT | Update quantities |
| DELETE | `/api/cart/:cartId/items/:itemId` | JWT | Remove one line item |
| POST | `/api/orders/checkout` | JWT | Places an order, decrements stock, clears cart |
| GET | `/api/orders/:id` | JWT | One order (owner or admin only) |
| GET | `/api/orders` | JWT | Order history for the logged-in user |
| POST | `/api/contact` | Public | Store a contact form submission |
| POST | `/api/uploads` | JWT | Upload a book cover image (multipart) |
| GET | `/api/admin/stats` | Admin | Orders count, revenue, top-selling books |

**Sort values accepted by `/api/books`:** `newest` (default), `price_asc`, `price_desc`, `rating_desc`, `title_asc`.

**Auth header format** (every protected request):
```
Authorization: Bearer <token from login/register response>
```

---

## 6) Key design decisions worth knowing

- **Stateless JWT auth** — no server-side session storage. The token itself (signed with `jwt.secret`) proves who's calling. `JwtAuthFilter` runs on every request and populates Spring Security's context from it.
- **One cart per user** — created lazily on first cart access, rather than requiring a separate "create cart" step.
- **Checkout is one transaction** (`@Transactional` in `OrderService.checkout`) — stock is validated and decremented, the order is created, and the cart is cleared all-or-nothing. If any book is out of stock, nothing is saved.
- **Price snapshotting** — `CartItem.priceAtAdd` and `OrderItem.price` freeze the price at that moment, so a later price change never rewrites someone's past cart or order history.
- **Dynamic filtering** — `/api/books` supports any combination of `q`, `category`, `author`, `minPrice`, `maxPrice` via `BookSpecifications`, instead of a rigid fixed set of query methods.
- **Centralized security rules** — all "who can call what" logic lives in one file, `SecurityConfig.java`, rather than scattered `@PreAuthorize` annotations across controllers. Easier to audit at a glance.
- **Local file storage for uploads** — good for development; the code comments in `UploadService.java` point out exactly where to swap in a real S3 signed-URL flow for production.

---

## 7) Extending this backend

- **Payments**: `OrderService.checkout()` currently sets `paymentUrl: null`. Integrate Razorpay/Stripe/PayPal there and return their redirect URL.
- **Email on contact form**: add `spring-boot-starter-mail` and call a `JavaMailSender` from `ContactService.submit()`.
- **Refresh tokens**: current JWTs expire after 24h (`jwt.expiration-ms`) with no refresh flow — add a `/api/auth/refresh` endpoint if you need longer-lived sessions.
- **Database migrations**: `ddl-auto=update` is great for development but risky for production schema changes — swap in Flyway or Liquibase before deploying for real.
