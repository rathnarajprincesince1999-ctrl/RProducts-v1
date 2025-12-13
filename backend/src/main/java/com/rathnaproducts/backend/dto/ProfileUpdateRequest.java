package com.rathnaproducts.backend.dto;

import lombok.Data;

@Data
public class ProfileUpdateRequest {
    private String name;
    private String phone;
    private String dateOfBirth;
}