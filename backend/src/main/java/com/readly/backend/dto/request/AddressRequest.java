package com.readly.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

/** Billing/shipping address shape used inside CheckoutRequest. */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class AddressRequest {

    @NotBlank(message = "name is required")
    private String name;

    @NotBlank(message = "address is required")
    private String addressLine;

    @NotBlank(message = "city is required")
    private String city;

    @NotBlank(message = "zip is required")
    private String zip;

    @NotBlank(message = "country is required")
    private String country;
}
