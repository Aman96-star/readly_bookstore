package com.readly.backend.service;

import com.readly.backend.dto.request.ContactRequest;
import com.readly.backend.dto.response.ApiMessageResponse;
import com.readly.backend.entity.ContactMessage;
import com.readly.backend.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * ContactService — backs POST /api/contact (from ContactForm.jsx).
 * Currently just persists the message to the database. To also notify an
 * admin by email, inject a JavaMailSender bean here and call it after save()
 * (add spring-boot-starter-mail to pom.xml + mail.* properties if you do).
 */
@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ApiMessageResponse submit(ContactRequest request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .message(request.getMessage())
                .build();

        contactMessageRepository.save(message);

        return ApiMessageResponse.builder()
                .ok(true)
                .message("Thanks for reaching out! We'll get back to you soon.")
                .build();
    }
}
