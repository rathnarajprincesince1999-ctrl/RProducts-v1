package com.rathnaproducts.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TransactionDto {
    private Long id;
    private String orderId;
    private Double amount;
    private String status;
    private String paymentMethod;
    private LocalDateTime createdAt;
}
