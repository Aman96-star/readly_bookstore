package com.readly.backend.repository;

import com.readly.backend.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

/** ContactMessageRepository — stores POST /api/contact submissions. */
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
