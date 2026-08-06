package com.readly.backend.service;

import com.readly.backend.dto.response.UploadResponse;
import com.readly.backend.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

/**
 * ============================================================================
 * UploadService — backs POST /api/uploads (book cover image uploads).
 * ============================================================================
 * This implementation stores files on local disk under app.upload.dir and
 * serves them back via WebConfig's /uploads/** resource handler — good
 * enough for development and small deployments.
 *
 * For production, swap this out for the "direct S3 signed-URL flow" the
 * frontend spec mentions: generate a pre-signed PUT URL (AWS SDK's
 * S3Presigner), return that URL to the frontend, and have the browser
 * upload directly to S3 instead of through this server.
 * ============================================================================
 */
@Service
@RequiredArgsConstructor
public class UploadService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    public UploadResponse upload(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("No file provided");
        }

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalName = file.getOriginalFilename() != null ? file.getOriginalFilename() : "file";
            String extension = originalName.contains(".") ? originalName.substring(originalName.lastIndexOf('.')) : "";
            String storedName = UUID.randomUUID() + extension;

            Path destination = uploadPath.resolve(storedName);
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

            String url = "/uploads/" + storedName;
            return UploadResponse.builder().url(url).build();

        } catch (IOException e) {
            throw new RuntimeException("Failed to store uploaded file", e);
        }
    }
}
