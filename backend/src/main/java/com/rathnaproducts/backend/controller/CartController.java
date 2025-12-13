package com.rathnaproducts.backend.controller;

import com.rathnaproducts.backend.dto.CartDto;
import com.rathnaproducts.backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartDto>> getCartItems(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<CartDto> addToCart(@PathVariable Long userId, 
                                           @RequestParam Long productId, 
                                           @RequestParam(defaultValue = "1") Integer quantity) {
        return ResponseEntity.ok(cartService.addToCart(userId, productId, quantity));
    }

    @PutMapping("/{userId}/update")
    public ResponseEntity<CartDto> updateQuantity(@PathVariable Long userId,
                                                @RequestParam Long productId,
                                                @RequestParam Integer quantity) {
        var result = cartService.updateQuantity(userId, productId, quantity);
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/remove")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long userId, @RequestParam Long productId) {
        cartService.removeFromCart(userId, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }
}