package com.readly.backend.dto.response;

import com.readly.backend.entity.embeddable.Address;
import lombok.*;

/** Address as returned inside an OrderResponse (billing or shipping). */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AddressResponse {
    private String name;
    private String addressLine;
    private String city;
    private String zip;
    private String country;

    public static AddressResponse fromEntity(Address a) {
        if (a == null) return null;
        return AddressResponse.builder()
                .name(a.getName())
                .addressLine(a.getAddressLine())
                .city(a.getCity())
                .zip(a.getZip())
                .country(a.getCountry())
                .build();
    }
}
