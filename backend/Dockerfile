# ============================================================================
# Dockerfile — Containerize the Readly backend for deployment
# ============================================================================
# This Dockerfile builds a Docker image of the Spring Boot backend.
# Usage:
#   docker build -t readly-backend:1.0.0 .
#   docker run -e DB_URL=jdbc:mysql://mysql-host:3306/readly_db \
#              -e DB_USER=root \
#              -e DB_PASSWORD=password \
#              -p 8080:8080 \
#              readly-backend:1.0.0
# ============================================================================

# Stage 1: Build stage
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy POM and download dependencies (caches better in Docker layers)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests -P prod

# Stage 2: Runtime stage (lightweight)
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Copy the built JAR from builder stage
COPY --from=builder /app/target/readly-backend-*.jar app.jar

# Create logs directory
RUN mkdir -p /app/logs

# Set active Spring profile to production
ENV SPRING_PROFILES_ACTIVE=prod

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
