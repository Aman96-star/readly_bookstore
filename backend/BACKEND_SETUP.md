# ============================================================================
# BACKEND_SETUP.md — Backend Development Setup Guide
# ============================================================================

## Prerequisites

- **Java 17+** (download from [adoptopenjdk.net](https://adoptopenjdk.net))
- **Maven 3.9+** (download from [maven.apache.org](https://maven.apache.org))
- **MySQL 8+** (for database)
- **Docker & Docker Compose** (optional, for containerized MySQL)

## Quick Start — Development

### 1. Setup MySQL Database

```bash
# Option A: Use Docker (if you have Docker installed)
docker run --name readly-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=readly_db \
  -p 3306:3306 \
  -d mysql:8

# Option B: Install MySQL locally and create the database manually
mysql -u root -p
> CREATE DATABASE readly_db;
> EXIT;
```

### 2. Install Dependencies & Build

```bash
cd backend
mvn clean install
```

### 3. Run in Development Mode

```bash
# Run with the dev profile (uses MySQL, verbose logging)
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"

# Or from the JAR
mvn clean package
java -jar target/readly-backend-1.0.0.jar --spring.profiles.active=dev
```

The backend will start on **http://localhost:8080**

## Configuration Profiles

### Development (`-Dspring-boot.run.arguments="--spring.profiles.active=dev"`)
- **Database**: MySQL (localhost:3306/readly_db)
- **Logging**: DEBUG level, console output
- **SQL**: Formatted and logged to console
- **Use case**: Local development

### Testing (`--spring.profiles.active=test`)
- **Database**: H2 in-memory
- **Logging**: WARN level (except com.readly=DEBUG)
- **SQL**: Not logged
- **Use case**: Unit and integration tests
- **Note**: Run tests with `mvn test -Dspring.profiles.active=test`

### Production (`--spring.profiles.active=prod`)
- **Database**: MySQL with connection pooling
- **Logging**: WARN level, file output (`logs/readly-backend.log`)
- **SQL**: Not logged
- **Credentials**: Read from environment variables (recommended)
- **Use case**: Deployed to production

## Running Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=ReadlyBackendApplicationTests

# Run tests with coverage
mvn test jacoco:report
```

## Building Docker Image

```bash
# Build the image
docker build -t readly-backend:1.0.0 .

# Run the container
docker run -e SPRING_PROFILES_ACTIVE=prod \
  -e DB_URL="jdbc:mysql://mysql-host:3306/readly_db" \
  -e DB_USER="root" \
  -e DB_PASSWORD="password" \
  -e JWT_SECRET="your-secret-key-here" \
  -p 8080:8080 \
  readly-backend:1.0.0
```

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/readly/backend/
│   │   │   ├── config/           # Spring configuration
│   │   │   ├── controller/       # REST endpoints
│   │   │   ├── service/          # Business logic
│   │   │   ├── repository/       # Database access (JPA)
│   │   │   ├── entity/           # JPA entities (@Entity)
│   │   │   ├── dto/              # Request/response DTOs
│   │   │   ├── security/         # JWT & auth
│   │   │   ├── exception/        # Custom exceptions
│   │   │   └── util/             # Utility classes
│   │   └── resources/
│   │       ├── application.properties       # Base config (profile selector)
│   │       ├── application-dev.properties   # Dev config
│   │       ├── application-prod.properties  # Prod config
│   │       └── logback.xml                  # Logging configuration
│   └── test/
│       ├── java/com/readly/backend/         # Test classes
│       └── resources/
│           └── application-test.properties  # Test config
├── pom.xml                # Maven build config
├── Dockerfile             # Container image definition
├── .gitignore            # Git ignore rules
└── .dockerignore         # Docker build ignore rules
```

## Common Commands

| Command | Purpose |
|---------|---------|
| `mvn clean install` | Build the project |
| `mvn spring-boot:run` | Run locally (dev mode) |
| `mvn test` | Run unit/integration tests |
| `mvn test jacoco:report` | Run tests with coverage |
| `mvn package` | Build JAR file |
| `mvn compile` | Compile only (no tests) |
| `mvn clean` | Delete build artifacts |

## Useful Endpoints for Testing

- **Health check**: http://localhost:8080/actuator/health
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API docs**: http://localhost:8080/v3/api-docs

## Troubleshooting

### MySQL Connection Error
```
Error: Connection refused
```
**Solution**: Ensure MySQL is running on localhost:3306 with credentials root/root

### Port 8080 Already in Use
```
Error: Address already in use
```
**Solution**: Change port in `application-dev.properties` or kill existing process:
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8080
kill -9 <PID>
```

### JWT Secret Too Short
```
Error: JWT secret must be at least 256 bits
```
**Solution**: Use a longer secret (min 32 characters). Generate one:
```bash
openssl rand -base64 32
```

## Security Notes

⚠️ **NEVER commit sensitive data to Git:**
- Never commit real JWT secrets
- Never commit database passwords
- Use environment variables in production
- Use `.env` files locally (add to `.gitignore`)

## Next Steps

1. Review [FRONTEND_BACKEND_SPEC.md](../frontend/FRONTEND_BACKEND_SPEC.md) to understand API requirements
2. Check the [README.md](./README.md) for architecture overview
3. Review controller classes to understand existing endpoints
4. Start the backend and test with the frontend (http://localhost:3000)
