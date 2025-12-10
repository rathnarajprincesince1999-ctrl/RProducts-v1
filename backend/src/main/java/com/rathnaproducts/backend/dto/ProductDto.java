package com.rathnaproducts.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductDto {
    private Long id;
    
    @NotBlank(message = "Product name is required")
    private String name;
    
    private String description;
    
    @NotNull(message = "Price is required")
    private Double price;
    
    private String image;
    
    @NotNull(message = "Category is required")
    private Long categoryId;
    
    private String categoryName;
}
