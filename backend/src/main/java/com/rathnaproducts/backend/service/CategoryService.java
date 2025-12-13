package com.rathnaproducts.backend.service;

import com.rathnaproducts.backend.dto.CategoryDto;
import com.rathnaproducts.backend.mapper.CategoryMapper;
import com.rathnaproducts.backend.repo.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final com.rathnaproducts.backend.repo.ProductRepository productRepository;
    private final com.rathnaproducts.backend.repo.CartRepository cartRepository;

    @Transactional
    public CategoryDto createCategory(CategoryDto categoryDto) {
        try {
            // Check for duplicate category name
            if (categoryRepository.existsByNameIgnoreCase(categoryDto.getName().trim())) {
                throw new RuntimeException("Category name '" + categoryDto.getName().trim() + "' already exists. Please choose a different name.");
            }
            
            var entity = categoryMapper.toEntity(categoryDto);
            entity.setName(entity.getName().trim());
            var saved = categoryRepository.save(entity);
            log.info("Created category with id: {}", saved.getId());
            return categoryMapper.toDto(saved);
        } catch (DataIntegrityViolationException e) {
            throw e;
        } catch (Exception e) {
            log.error("Failed to create category: {}", e.getMessage());
            throw new RuntimeException("Failed to create category: " + e.getMessage(), e);
        }
    }

    public List<CategoryDto> getAllCategories() {
        try {
            return categoryRepository.findAll().stream()
                    .map(categoryMapper::toDto)
                    .toList();
        } catch (Exception e) {
            log.error("Failed to fetch categories: {}", e.getMessage());
            throw new RuntimeException("Failed to fetch categories", e);
        }
    }

    @Transactional
    public CategoryDto updateCategory(Long id, CategoryDto categoryDto) {
        var category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + id));
        
        try {
            // Check for duplicate name if name is being changed
            if (categoryDto.getName() != null && !categoryDto.getName().trim().isEmpty() 
                && !category.getName().equalsIgnoreCase(categoryDto.getName().trim())
                && categoryRepository.existsByNameIgnoreCase(categoryDto.getName().trim())) {
                throw new DataIntegrityViolationException("Category with name '" + categoryDto.getName() + "' already exists");
            }
            
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
            
            var updated = categoryRepository.save(category);
            log.info("Updated category with id: {}", id);
            return categoryMapper.toDto(updated);
        } catch (DataIntegrityViolationException e) {
            throw e;
        } catch (Exception e) {
            log.error("Failed to update category {}: {}", id, e.getMessage());
            throw new RuntimeException("Failed to update category: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new EntityNotFoundException("Category not found with id: " + id);
        }
        
        try {
            // Get all products in this category
            var products = productRepository.findByCategoryId(id);
            
            if (!products.isEmpty()) {
                // First delete all cart items for these products
                for (var product : products) {
                    cartRepository.deleteByProductId(product.getId());
                }
                log.info("Deleted cart items for products in category {}", id);
                
                // Then delete all products in this category
                productRepository.deleteAll(products);
                log.info("Deleted {} products from category {}", products.size(), id);
            }
            
            // Finally delete the category
            categoryRepository.deleteById(id);
            log.info("Deleted category with id: {}", id);
        } catch (Exception e) {
            log.error("Failed to delete category {}: {}", id, e.getMessage());
            throw new RuntimeException("Failed to delete category: " + e.getMessage(), e);
        }
    }

    public CategoryDto getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(categoryMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + id));
    }
}
