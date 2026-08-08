# Frontend → Backend Spec for Readly Bookstore

Purpose: provide a single reference describing the frontend stack, file-by-file responsibilities and data flows, and suggested backend API contracts so you can implement the backend accordingly.

## 1) High-level tech stack
- Framework: Next.js (App Router) with TypeScript support (`next.config.ts`, `tsconfig.json`).
- Styling: Tailwind CSS (configured via `tailwind.config.js`), plus CSS modules (e.g., `BookExplorer.module.css`).
- State management: local store under `store/` (likely a Context or Zustand/Redux slice in `store.tsx`).
- Data files: `data/books.ts` contains seed/sample data used by components.
- API layer: `services/api_calls.tsx` contains client-side API calls (fetch/axios wrappers).

## 2) Key frontend folders & important files
- `app/`
  - `page.tsx` — Home page that composes components and fetches initial data.
  - `layout.tsx` — Root layout (shared header/footer, meta tags).
  - `books/page.tsx` — Books listing route (uses BookExplorer or Book components).
  - Many routes use `.jsx` or `.tsx` — follow patterns in `about/`, `blog/`, `contact/`, etc.
- `components/`
  - `Navbar.tsx`, `Footer.tsx` — global navigation and footer.
  - `BookExplorer.tsx` + `BookExplorer.module.css` — main catalog UI, filters, pagination.
  - `BookCarousel/BookCarousel.tsx`, `BestSellers/BestSellers.tsx` — specialized listings.
  - `ContactForm.jsx`, `CTASection.jsx`, `FeatureCard.jsx`, `FAQCard.jsx`, `PageContainer.jsx`, `PageHero.jsx` — UI building blocks.
  - `admin/AdminSidebar.tsx` — admin UI for content management.
- `services/`
  - `api_calls.tsx` — centralized API functions used across components for books, auth, cart, orders.
- `store/`
  - `store.tsx` — client-side state store (cart items, user auth state, maybe wishlist).
- `data/`
  - `books.ts` — static sample book data used for development or fallback rendering.
- `lib/`
  - `site.ts` — site-wide constants (site title, maybe API base URL).

## 3) File-by-file flow (high-level)
Use these flows to design backend endpoints and expected payloads.

- `data/books.ts` (source)
  - Contains sample book objects used to prototype UI.
  - Flow: `data/books.ts` -> `BookExplorer.tsx` / listing pages. On real backend: `services/api_calls.tsx` will replace direct imports.

- `services/api_calls.tsx` (API client)
  - All fetch/axios calls originate here.
  - Flow: UI component -> call function in `api_calls` -> HTTP request to backend endpoint -> return JSON -> UI updates state.
  - Behavior to support: pagination, filtering (category, author, price range), search, sorting, and per-book details.

- `BookExplorer.tsx` / `Books` pages
  - Responsibilities: request list of books (with query params), render grid, handle filters, sorting, pagination, and add-to-cart interactions.
  - Flow: UI interactions -> update local component state / call `store` -> call `services/api_calls` -> backend -> update UI.

- `Navbar.tsx`
  - Shows auth state (login/register), cart count (from `store`), and search input.
  - Flow: search input triggers debounce -> call `services/api_calls.searchBooks(q)` -> show suggestions or navigate to results page.

- `ContactForm.jsx` and other forms
  - Send POST requests to backend contact endpoint -> backend stores message or emails admin -> returns success.

- `store/store.tsx` (client store)
  - Keeps cart items, user token, and basic user profile.
  - Flow: add/remove item -> persist to localStorage (optional) -> when performing checkout -> send cart payload to backend to create an order.

- `admin/*` components
  - Likely call admin APIs for managing books, categories, and orders. Requires auth & role checking on backend.

## 4) Suggested backend API endpoints
Design the backend to support these routes. Use REST or GraphQL — examples below are REST-based.

Base URL: `/api` (or root routes like `/books`). Use JSON over HTTPS.

- Auth
  - POST `/api/auth/register`
    - Body: { name, email, password }
    - Response: { user: { id, name, email }, token }
  - POST `/api/auth/login`
    - Body: { email, password }
    - Response: { user, token }
  - GET `/api/auth/me` (protected)
    - Response: { user }

- Books
  - GET `/api/books`
    - Query params: `page`, `limit`, `q` (search), `category`, `sort`, `minPrice`, `maxPrice`, `author`
    - Response: { items: [Book], total, page, limit }
  - GET `/api/books/:id`
    - Response: { book }
  - POST `/api/books` (admin)
    - Body: BookCreate
    - Response: created book
  - PUT `/api/books/:id` (admin)
  - DELETE `/api/books/:id` (admin)

- Categories
  - GET `/api/categories`
    - Response: [ { id, name, slug } ]

- Cart
  - POST `/api/cart` (save server-side cart)
    - Body: { userId (optional), items: [{bookId, qty}] }
    - Response: { cartId, items }
  - GET `/api/cart/:userId` or GET `/api/cart` (with token)
  - PUT `/api/cart/:cartId` (update quantities)
  - DELETE `/api/cart/:cartId/items/:itemId`

- Orders / Checkout
  - POST `/api/orders/checkout`
    - Body: { userId, cartItems, billingInfo, shippingInfo, paymentMethod }
    - Response: { orderId, status, paymentUrl (if external) }
  - GET `/api/orders/:id` (protected)
  - GET `/api/orders?userId=` (order history)

- Search / Suggestions
  - GET `/api/search?q=...&limit=5`
    - Response: { books: [...], categories: [...] }

- Contact / Support
  - POST `/api/contact`
    - Body: { name, email, message }
    - Response: { ok: true }

- Admin dashboards
  - GET `/api/admin/stats` (orders count, revenue, top books)

## 5) Suggested JSON shapes (examples)
- Book object
  - {
      id: string,
      title: string,
      slug: string,
      author: string,
      description: string,
      price: number,
      currency: "USD",
      images: [string],
      categories: [string],
      stock: number,
      rating: number,
      reviewsCount: number,
      publishedAt: "2024-01-01"
    }

- Cart payload
  - {
      userId: string | null,
      items: [{ bookId: string, qty: number, priceAtAdd: number }]
    }

- Order payload
  - {
      userId,
      items: [{ bookId, qty, price }],
      billing: { name, address, city, zip, country },
      shipping: { ...same... },
      payment: { method: 'card' | 'paypal', transactionId?: string }
    }

## 6) Auth & security considerations
- Use JWT or session tokens. Frontend expects token in `Authorization: Bearer <token>`.
- Protect admin endpoints with role checks.
- Rate-limit public endpoints like `/api/search` and `/api/auth/login`.
- Validate payloads server-side (price, stock, email format).

## 7) Performance & UX expectations (backend support)
- Pagination for `/api/books` (do not return full dataset).
- Filtering and search should be handled server-side for large datasets.
- Cache commonly requested lists (best-sellers, home featured) with short TTL.
- Provide `ETag` or `lastModified` for images/content when possible.

## 8) Integration notes for frontend developers
- `services/api_calls.tsx` should export functions matching backend routes, e.g., `getBooks(params)`, `getBook(id)`, `login(credentials)`, `checkout(orderPayload)`.
- Keep API base URL in `lib/site.ts` or environment variables (`NEXT_PUBLIC_API_URL`).
- For file uploads (book images), provide a multipart endpoint or direct S3 signed-URL flow: POST `/api/uploads` -> return `url`.

## 9) Admin features to support
- CRUD for books and categories
- Upload images
- View and update order status

## 10) Priority endpoints to implement first (minimum viable backend)
1. `GET /api/books` with pagination and search
2. `GET /api/books/:id`
3. `POST /api/auth/login` and `POST /api/auth/register` (simple JWT)
4. `POST /api/cart` and `POST /api/orders/checkout`
5. `GET /api/categories`

---

If you want, I can also:
- generate an OpenAPI (Swagger) spec for the endpoints above,
- scaffold a minimal Express / Node.js backend with the core endpoints,
- or produce example `services/api_calls.tsx` functions matching the API.

