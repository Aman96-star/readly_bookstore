1️⃣ Install Node.js
-----------------------------------------
Make sure Node.js is installed Check:

node -v
npm -v

2️⃣ Create Project using Next.js
------------------------------------------
Run this command:

npx create-next-app@latest .
3 . --------------------------------------
```readly_bookstore/
│── app/
│   ├── page.js        // Home page
│   ├── layout.js      // Layout
│
│── components/        // Your reusable components
│── public/            // Images
│── styles/            // CSS
```

4. Install tailwind css 
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Monolithic Architecture of my Project :
```
readly-bookstore/
│
├── frontend/ (Next.js / React)
│   ├── pages/
│   ├── components/
│   └── services/ (API calls)
│
├── backend/ (Spring Boot / Node.js)
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   └── models/
│
├── database/
│   └── schema.sql
│
└── config/
```
#Fronted structure--------------------------------
```
frontend/
│
├── public/                 # Images, icons, static files
│
├── src/
│   ├── app/                # Pages / Routes (Next.js App Router)
│   │   ├── page.js         # Home page
│   │   ├── login/page.js
│   │   ├── register/page.js
│   │   ├── books/page.js
│   │   ├── cart/page.js
│   │
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.js
│   │   ├── BookCard.js
│   │   ├── Footer.js
│   │
│   ├── services/           # API calls (important 🔥)
│   │   ├── authService.js
│   │   ├── bookService.js
│   │
│   ├── store/              # State management
│   │   ├── store.js
│   │   ├── authSlice.js
│   │
│   ├── utils/              # Helper functions
│   │   ├── api.js
│   │
│   ├── styles/             # CSS / Tailwind
│
├── package.json
├── next.config.js
```

My navbar Layout
```
-----------------------------------
| Logo | Menu Links | Buttons |
-----------------------------------
```
```
books.ts
(Data)

   ↓

BookExplorer.tsx
(Logic + State)

   ↓

BookExplorer.module.css
(UI Design)

   ↓

page.tsx
(Render in Browser)

   ↓

User Interaction
```

``` backend Section 

backend/
│
├── src/
│   ├── main/
│   │
│   ├── java/
│   │   └── com/
│   │       └── bookstore/
│   │
│   │           ├── BookstoreApplication.java     # Main Class
│   │
│   │           ├── config/                       # Configuration
│   │           │      ├── SecurityConfig.java
│   │           │      ├── CorsConfig.java
│   │           │      └── JwtConfig.java
│   │
│   │           ├── controller/                   # REST APIs
│   │           │      ├── AuthController.java
│   │           │      ├── BookController.java
│   │           │      ├── CartController.java
│   │           │      ├── OrderController.java
│   │           │      └── UserController.java
│   │
│   │           ├── service/                      # Business Logic
│   │           │      ├── AuthService.java
│   │           │      ├── BookService.java
│   │           │      ├── CartService.java
│   │           │      ├── OrderService.java
│   │           │      └── UserService.java
│   │           │
│   │           ├── service/
│   │           │      └── impl/
│   │           │             ├── AuthServiceImpl.java
│   │           │             ├── BookServiceImpl.java
│   │           │             ├── CartServiceImpl.java
│   │           │             ├── OrderServiceImpl.java
│   │           │             └── UserServiceImpl.java
│   │
│   │           ├── repository/                   # Database Layer
│   │           │      ├── UserRepository.java
│   │           │      ├── BookRepository.java
│   │           │      ├── CartRepository.java
│   │           │      └── OrderRepository.java
│   │
│   │           ├── entity/                       # Database Tables
│   │           │      ├── User.java
│   │           │      ├── Book.java
│   │           │      ├── Cart.java
│   │           │      └── Order.java
│   │
│   │           ├── dto/                          # Request/Response Objects
│   │           │      ├── LoginRequest.java
│   │           │      ├── RegisterRequest.java
│   │           │      ├── BookResponse.java
│   │           │      └── OrderResponse.java
│   │
│   │           ├── exception/                    # Custom Exceptions
│   │           │      ├── GlobalExceptionHandler.java
│   │           │      └── ResourceNotFoundException.java
│   │
│   │           ├── security/                     # JWT Authentication
│   │           │      ├── JwtFilter.java
│   │           │      ├── JwtUtil.java
│   │           │      └── CustomUserDetailsService.java
│   │
│   │           └── util/                         # Utility Classes
│   │                  └── AppConstants.java
│   │
│   └── resources/
│       ├── application.properties
│       ├── application-dev.properties
│       ├── application-prod.properties
│       └── static/
│
├── pom.xml
├── mvnw
└── mvnw.cmd

```






















