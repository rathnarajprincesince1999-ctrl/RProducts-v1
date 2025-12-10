package com.rathnaproducts.backend.dto;

import lombok.Data;

@Data
public class AdminProfileUpdateRequest {
    private String username;
    private String email;
    private String currentPassword;
    private String newPassword;
}
