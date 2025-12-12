package com.rathnaproducts.backend.service;

import com.rathnaproducts.backend.dto.CartDto;
import com.rathnaproducts.backend.model.Cart;
import com.rathnaproducts.backend.repo.CartRepository;
import com.rathnaproducts.backend.repo.ProductRepository;
import com.rathnaproducts.backend.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public List<CartDto> getCartItems(Long userId) {
        if (userId == null) {
            throw new RuntimeException("User ID cannot be null");
        }
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found with ID: " + userId);
        }
        return cartRepository.findByUserId(userId).stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public CartDto addToCart(Long userId, Long productId, Integer quantity) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        var product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        var existingCart = cartRepository.findByUserIdAndProductId(userId, productId);
        
        Cart cart;
        if (existingCart.isPresent()) {
            cart = existingCart.get();
            cart.setQuantity(cart.getQuantity() + quantity);
        } else {
            cart = new Cart();
            cart.setUser(user);
            cart.setProduct(product);
            cart.setQuantity(quantity);
        }
        
        return toDto(cartRepository.save(cart));
    }

    @Transactional
    public CartDto updateQuantity(Long userId, Long productId, Integer quantity) {
        var cart = cartRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (quantity <= 0) {
            cartRepository.delete(cart);
            return null;
        }
        
        cart.setQuantity(quantity);
        return toDto(cartRepository.save(cart));
    }

    @Transactional
    public void removeFromCart(Long userId, Long productId) {
        var cart = cartRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartRepository.delete(cart);
    }

    @Transactional
    public void clearCart(Long userId) {
        cartRepository.deleteByUserId(userId);
    }

    private CartDto toDto(Cart cart) {
        var dto = new CartDto();
        dto.setId(cart.getId());
        dto.setProductId(cart.getProduct().getId());
        dto.setProductName(cart.getProduct().getName());
        dto.setName(cart.getProduct().getName()); // For frontend compatibility
        dto.setPrice(cart.getProduct().getPrice());
        dto.setImage(cart.getProduct().getImage());
        dto.setCategoryName(cart.getProduct().getCategory() != null ? cart.getProduct().getCategory().getName() : "Unknown");
        dto.setQuantity(cart.getQuantity());
        return dto;
    }
}