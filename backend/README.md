```
backend/
│
├── src/main/java/com/app/
│
│   ├── controller/        # API endpoints
│   │   ├── AuthController.java
│   │   ├── BookController.java
│
│   ├── service/           # Business logic
│   │   ├── AuthService.java
│   │   ├── BookService.java
│   │
│   ├── service/impl/
│   │   ├── AuthServiceImpl.java
│   │   ├── BookServiceImpl.java
│
│   ├── repository/        # Database layer
│   │   ├── UserRepository.java
│   │   ├── BookRepository.java
│
│   ├── entity/            # Database models
│   │   ├── User.java
│   │   ├── Book.java
│
│   ├── dto/               # Request & Response
│   │   ├── AuthRequest.java
│   │   ├── BookResponse.java
│
│   ├── config/            # Configurations
│   │   ├── SecurityConfig.java
│
│   ├── exception/         # Error handling
│   │   ├── GlobalExceptionHandler.java
│
│   ├── util/              # Helpers
│
│   └── Application.java   # Main class
│
├── resources/
│   ├── application.yml
```