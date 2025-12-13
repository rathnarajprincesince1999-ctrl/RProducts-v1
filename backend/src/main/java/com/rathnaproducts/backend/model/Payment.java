package com.rathnaproducts.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "payments")
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(length = 19) // Max 19 chars for formatted card number (XXXX-XXXX-XXXX-XXXX)
    private String cardNumber;
    
    @Column(length = 100)
    private String cardHolder;
    
    @Column(length = 5) // MM/YY format
    private String expiryDate;
    
    @Column(length = 4) // CVV is typically 3-4 digits
    private String cvv;
    
    @Column(length = 50) // UPI ID format: user@provider
    private String upiId;
    
    @Column(nullable = false, length = 20)
    private String paymentType;
}
