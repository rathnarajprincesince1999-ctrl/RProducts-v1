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
    
    @Column(length = 500)
    private String cardNumber;
    
    @Column(length = 200)
    private String cardHolder;
    
    @Column(length = 10)
    private String expiryDate;
    
    @Column(length = 500)
    private String cvv;
    
    @Column(length = 200)
    private String upiId;
    
    @Column(nullable = false, length = 20)
    private String paymentType;
}
