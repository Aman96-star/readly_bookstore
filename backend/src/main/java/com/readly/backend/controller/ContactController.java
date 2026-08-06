package com.readly.backend.controller;

import com.readly.backend.dto.request.ContactRequest;
import com.readly.backend.dto.response.ApiMessageResponse;
import com.readly.backend.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/** ContactController — POST /api/contact (public). Backs ContactForm.jsx. */
@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ApiMessageResponse> submit(@Valid @RequestBody ContactRequest request) {
        return ResponseEntity.ok(contactService.submit(request));
    }
}
