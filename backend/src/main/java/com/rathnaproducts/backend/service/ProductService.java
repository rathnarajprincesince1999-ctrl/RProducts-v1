package com.rathnaproducts.backend.service;

import com.rathnaproducts.backend.dto.ProductDto;
import com.rathnaproducts.backend.mapper.ProductMapper;
import com.rathnaproducts.backend.model.Product;
import com.rathnaproducts.backend.repo.CategoryRepository;
import com.rathnaproducts.backend.repo.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
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
                .orElseThrow(() -> new EntityNotFoundException("Category not found")));
        return productMapper.toDto(productRepository.save(product));
    }

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(productMapper::toDto)
                .toList();
    }

    public ProductDto getProductById(Long id) {
        return productRepository.findById(id)
                .map(productMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
    }

    public List<ProductDto> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
                .map(productMapper::toDto)
                .toList();
    }

    @Transactional
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        var product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        
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
                    .orElseThrow(() -> new EntityNotFoundException("Category not found")));
        }
        
        return productMapper.toDto(productRepository.save(product));
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    public List<ProductDto> searchProducts(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllProducts();
        }
        return productRepository.findByNameOrDescriptionContainingIgnoreCase(searchTerm.trim())
                .stream()
                .map(productMapper::toDto)
                .toList();
    }

    public List<ProductDto> filterProducts(Double minPrice, Double maxPrice, Long categoryId) {
        List<Product> products;
        
        if (minPrice != null && maxPrice != null) {
            products = productRepository.findByPriceBetween(minPrice, maxPrice);
        } else {
            products = productRepository.findAll();
        }
        
        if (categoryId != null) {
            products = products.stream()
                    .filter(p -> p.getCategory().getId().equals(categoryId))
                    .toList();
        }
        
        return products.stream()
                .map(productMapper::toDto)
                .toList();
    }
}
