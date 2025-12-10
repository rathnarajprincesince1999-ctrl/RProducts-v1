package com.rathnaproducts.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class PaymentDto {
    private Long id;
    private String cardNumber;
    private String cardHolder;
    private String expiryDate;
    private String cvv;
    private String upiId;
    
    @NotBlank(message = "Payment type is required")
    @Pattern(regexp = "CARD|UPI", message = "Payment type must be CARD or UPI")
    private String paymentType;
}
