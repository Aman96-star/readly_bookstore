package com.readly.backend.dto.response;

import lombok.*;

/** Response for POST /api/uploads — matches spec: { url } */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UploadResponse {
    private String url;
}
