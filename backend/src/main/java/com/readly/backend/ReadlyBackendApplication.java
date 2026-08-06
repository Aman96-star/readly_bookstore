package com.readly.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * ============================================================================
 * ReadlyBackendApplication — Entry point of the whole backend.
 * ============================================================================
 * Running `mvn spring-boot:run` (or the JAR) starts here. @SpringBootApplication
 * is shorthand for three annotations:
 *   - @Configuration      -> this class can define Spring beans
 *   - @EnableAutoConfiguration -> Spring Boot auto-wires DataSource, JPA,
 *                                 Security, Jackson (JSON), etc. based on
 *                                 what's on the classpath (see pom.xml)
 *   - @ComponentScan      -> scans this package (and sub-packages) for
 *                            @Component/@Service/@Repository/@Controller
 *                            classes and registers them automatically.
 *
 * Beginner note: this is the Spring Boot equivalent of your Next.js app's
 * root layout.tsx + server bootstrap combined — it wires everything together
 * before the app starts accepting HTTP requests.
 * ============================================================================
 */
@SpringBootApplication
public class ReadlyBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReadlyBackendApplication.class, args);
    }
}
