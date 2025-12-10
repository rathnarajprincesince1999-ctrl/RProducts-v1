package com.rathnaproducts.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryDto {
    private Long id;
    
    @NotBlank(message = "Category name is required")
    private String name;
    
    private String description;
    private String icon;
    private String color;
    private String logoImage;
    private String bannerImage;
}
