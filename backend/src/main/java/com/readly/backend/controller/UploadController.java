package com.readly.backend.controller;

import com.readly.backend.dto.response.UploadResponse;
import com.readly.backend.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * UploadController — POST /api/uploads (requires a valid JWT — any logged-in
 * user can upload; admin UI uses this for book cover images).
 * multipart/form-data with a single field named "file".
 */
@RestController
@RequestMapping("/api/uploads")
@RequiredArgsConstructor
public class UploadController {

    private final UploadService uploadService;

    @PostMapping
    public UploadResponse upload(@RequestParam("file") MultipartFile file) {
        return uploadService.upload(file);
    }
}
