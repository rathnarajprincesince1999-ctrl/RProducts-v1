package com.rathnaproducts.backend.mapper;

import com.rathnaproducts.backend.dto.CategoryDto;
import com.rathnaproducts.backend.model.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toEntity(CategoryDto dto);
    CategoryDto toDto(Category entity);
}
