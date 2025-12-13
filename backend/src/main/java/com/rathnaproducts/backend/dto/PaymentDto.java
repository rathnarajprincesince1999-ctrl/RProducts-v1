package com.rathnaproducts.backend.dto;

import lombok.Data;

@Data
public class PaymentDto {
    private Long id;
    private String cardNumber;
    private String cardHolder;
    private String expiryDate;
    private String cvv;
    private String upiId;
    private String paymentType;
}