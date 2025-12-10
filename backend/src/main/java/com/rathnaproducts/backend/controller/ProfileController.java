package com.rathnaproducts.backend.controller;

import com.rathnaproducts.backend.dto.*;
import com.rathnaproducts.backend.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @PutMapping("/{userId}")
    public ResponseEntity<UserResponse> updateProfile(@PathVariable Long userId, @RequestBody ProfileUpdateRequest request) {
        return ResponseEntity.ok(profileService.updateProfile(userId, request));
    }

    @GetMapping("/{userId}/addresses")
    public ResponseEntity<List<AddressDto>> getAddresses(@PathVariable Long userId) {
        return ResponseEntity.ok(profileService.getAddresses(userId));
    }

    @PostMapping("/{userId}/addresses")
    public ResponseEntity<AddressDto> saveAddress(@PathVariable Long userId, @RequestBody AddressDto dto) {
        return ResponseEntity.ok(profileService.saveAddress(userId, dto));
    }

    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long addressId) {
        profileService.deleteAddress(addressId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}/payments")
    public ResponseEntity<List<PaymentDto>> getPayments(@PathVariable Long userId) {
        return ResponseEntity.ok(profileService.getPayments(userId));
    }

    @PostMapping("/{userId}/payments")
    public ResponseEntity<PaymentDto> savePayment(@PathVariable Long userId, @RequestBody PaymentDto dto) {
        return ResponseEntity.ok(profileService.savePayment(userId, dto));
    }

    @DeleteMapping("/payments/{paymentId}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long paymentId) {
        profileService.deletePayment(paymentId);
        return ResponseEntity.ok().build();
    }
}
