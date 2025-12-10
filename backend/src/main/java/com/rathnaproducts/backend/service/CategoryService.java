package com.rathnaproducts.backend.service;

import com.rathnaproducts.backend.dto.CategoryDto;
import com.rathnaproducts.backend.mapper.CategoryMapper;
import com.rathnaproducts.backend.repo.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Transactional
    public CategoryDto createCategory(CategoryDto categoryDto) {
        try {
            var entity = categoryMapper.toEntity(categoryDto);
            var saved = categoryRepository.save(entity);
            return categoryMapper.toDto(saved);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create category: " + e.getMessage(), e);
        }
    }

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toDto)
                .toList();
    }

    @Transactional
    public CategoryDto updateCategory(Long id, CategoryDto categoryDto) {
        var category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        if (categoryDto.getName() != null && !categoryDto.getName().trim().isEmpty()) {
            category.setName(categoryDto.getName().trim());
        }
        if (categoryDto.getDescription() != null) {
            category.setDescription(categoryDto.getDescription());
        }
        if (categoryDto.getIcon() != null) {
            category.setIcon(categoryDto.getIcon());
        }
        if (categoryDto.getColor() != null) {
            category.setColor(categoryDto.getColor());
        }
        if (categoryDto.getLogoImage() != null && !categoryDto.getLogoImage().isEmpty()) {
            category.setLogoImage(categoryDto.getLogoImage());
        }
        if (categoryDto.getBannerImage() != null && !categoryDto.getBannerImage().isEmpty()) {
            category.setBannerImage(categoryDto.getBannerImage());
        }
        
        return categoryMapper.toDto(categoryRepository.save(category));
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
