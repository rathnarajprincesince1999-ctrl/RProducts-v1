package com.rathnaproducts.backend.mapper;

import com.rathnaproducts.backend.dto.ProductDto;
import com.rathnaproducts.backend.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "category", ignore = true)
    Product toEntity(ProductDto dto);
    
    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    ProductDto toDto(Product entity);
}
