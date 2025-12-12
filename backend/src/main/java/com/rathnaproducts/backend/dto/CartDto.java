package com.rathnaproducts.backend.dto;

import lombok.Data;

@Data
public class CartDto {
    private Long id;
    private Long productId;
    private String productName;
    private String name; // For frontend compatibility
    private Double price;
    private String image;
    private String categoryName;
    private Integer quantity;
}