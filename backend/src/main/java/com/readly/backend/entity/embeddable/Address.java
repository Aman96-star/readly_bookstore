package com.readly.backend.entity.embeddable;

import jakarta.persistence.Embeddable;
import lombok.*;

/**
 * Address — reusable value object embedded directly into the Order table
 * (not its own table). Used twice: once as "billing_*" columns and once as
 * "shipping_*" columns (see the @AttributeOverrides in Order.java).
 * Matches the "billing"/"shipping" shape from the frontend's Order payload.
 */
@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {
    private String name;
    private String addressLine;
    private String city;
    private String zip;
    private String country;
}
