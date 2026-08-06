package com.readly.backend.dto.response;

import lombok.*;

/** Generic { ok, message } response, used by /api/contact and simple confirmations. */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ApiMessageResponse {
    private boolean ok;
    private String message;
}
