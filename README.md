# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
```
book-store-app/
│
├── README.md
├── .gitignore
├── pom.xml
├── mvnw
├── mvnw.cmd
│
├── .mvn/
│   └── wrapper/
│       └── maven-wrapper.properties
│
├── src/
│   ├── main/
│   │   ├── java/com/example/bookstore/
│   │   │   ├── controller/
│   │   │   │   ├── BookController.java
│   │   │   │   └── UserController.java
│   │   │   │
│   │   │   ├── service/
│   │   │   │   └── BookService.java
│   │   │   │
│   │   │   ├── repository/
│   │   │   │   └── BookRepository.java
│   │   │   │
│   │   │   ├── entity/
│   │   │   │   ├── Book.java
│   │   │   │   └── User.java
│   │   │   │
│   │   │   ├── config/
│   │   │   │   └── SecurityConfig.java
│   │   │   │
│   │   │   └── BookStoreApplication.java
│   │   │
│   │   └── resources/
│   │       ├── templates/
│   │       │   ├── index.html
│   │       │   ├── addBook.html
│   │       │   └── login.html
│   │       │
│   │       ├── static/
│   │       │   ├── css/
│   │       │   ├── js/
│   │       │   └── images/
│   │       │
│   │       ├── application.properties
│   │       └── data.sql
│   │
│   └── test/
│       └── java/com/example/bookstore/
│           └── BookStoreApplicationTests.java
│
└── docs/
    ├── architecture.md
    └── api-docs.md
```
