package com.rathnaproducts.backend.service;

import com.rathnaproducts.backend.dto.ProductDto;
import com.rathnaproducts.backend.mapper.ProductMapper;
import com.rathnaproducts.backend.model.Product;
import com.rathnaproducts.backend.repo.CategoryRepository;
import com.rathnaproducts.backend.repo.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    @Transactional
    public ProductDto createProduct(ProductDto productDto) {
        Product product = productMapper.toEntity(productDto);
        product.setCategory(categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found")));
        return productMapper.toDto(productRepository.save(product));
    }

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(productMapper::toDto)
                .toList();
    }

    public List<ProductDto> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
                .map(productMapper::toDto)
                .toList();
    }

    @Transactional
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        var product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        if (productDto.getName() != null && !productDto.getName().trim().isEmpty()) {
            product.setName(productDto.getName().trim());
        }
        if (productDto.getDescription() != null) {
            product.setDescription(productDto.getDescription());
        }
        if (productDto.getPrice() != null) {
            product.setPrice(productDto.getPrice());
        }
        if (productDto.getImage() != null && !productDto.getImage().isEmpty()) {
            product.setImage(productDto.getImage());
        }
        if (productDto.getCategoryId() != null) {
            product.setCategory(categoryRepository.findById(productDto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found")));
        }
        
        return productMapper.toDto(productRepository.save(product));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
