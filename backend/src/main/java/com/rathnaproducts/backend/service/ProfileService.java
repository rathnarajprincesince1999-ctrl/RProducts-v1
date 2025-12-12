package com.rathnaproducts.backend.service;

import com.rathnaproducts.backend.dto.*;
import com.rathnaproducts.backend.mapper.*;
import com.rathnaproducts.backend.model.*;
import com.rathnaproducts.backend.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final PaymentRepository paymentRepository;
    private final UserMapper userMapper;
    private final AddressMapper addressMapper;
    private final PaymentMapper paymentMapper;

    public UserResponse getProfile(Long userId) {
        if (userId == null) {
            throw new RuntimeException("User ID cannot be null");
        }
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setDateOfBirth(user.getDateOfBirth());
        return response;
    }

    @Transactional
    public UserResponse updateProfile(Long userId, ProfileUpdateRequest request) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setDateOfBirth(request.getDateOfBirth());
        userRepository.save(user);
        
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        return response;
    }

    public List<AddressDto> getAddresses(Long userId) {
        if (userId == null) {
            throw new RuntimeException("User ID cannot be null");
        }
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found with ID: " + userId);
        }
        return addressRepository.findByUserId(userId).stream()
            .map(addressMapper::toDto)
            .toList();
    }

    @Transactional
    public AddressDto saveAddress(Long userId, AddressDto dto) {
        if (userId == null) {
            throw new RuntimeException("User ID cannot be null");
        }
        if (dto == null) {
            throw new RuntimeException("Address data cannot be null");
        }
        
        // Validate required fields
        validateAddressFields(dto);
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        
        try {
            Address address = addressMapper.toEntity(dto);
            address.setUser(user);
            Address savedAddress = addressRepository.save(address);
            return addressMapper.toDto(savedAddress);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save address: " + e.getMessage());
        }
    }

    @Transactional
    public AddressDto updateAddress(Long addressId, AddressDto dto) {
        if (addressId == null) {
            throw new RuntimeException("Address ID cannot be null");
        }
        if (dto == null) {
            throw new RuntimeException("Address data cannot be null");
        }
        
        // Validate required fields
        validateAddressFields(dto);
        
        Address existingAddress = addressRepository.findById(addressId)
            .orElseThrow(() -> new RuntimeException("Address not found with ID: " + addressId));
        
        try {
            // Update fields
            existingAddress.setStreet(dto.getStreet());
            existingAddress.setCity(dto.getCity());
            existingAddress.setState(dto.getState());
            existingAddress.setZip(dto.getZip());
            existingAddress.setCountry(dto.getCountry());
            
            Address updatedAddress = addressRepository.save(existingAddress);
            return addressMapper.toDto(updatedAddress);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update address: " + e.getMessage());
        }
    }
    
    private void validateAddressFields(AddressDto dto) {
        if (dto.getStreet() == null || dto.getStreet().trim().isEmpty()) {
            throw new RuntimeException("Street address is required");
        }
        if (dto.getCity() == null || dto.getCity().trim().isEmpty()) {
            throw new RuntimeException("City is required");
        }
        if (dto.getState() == null || dto.getState().trim().isEmpty()) {
            throw new RuntimeException("State is required");
        }
        if (dto.getZip() == null || dto.getZip().trim().isEmpty()) {
            throw new RuntimeException("ZIP code is required");
        }
        if (dto.getCountry() == null || dto.getCountry().trim().isEmpty()) {
            throw new RuntimeException("Country is required");
        }
    }

    public void deleteAddress(Long addressId) {
        addressRepository.deleteById(addressId);
    }

    public List<PaymentDto> getPayments(Long userId) {
        if (userId == null) {
            throw new RuntimeException("User ID cannot be null");
        }
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found with ID: " + userId);
        }
        return paymentRepository.findByUserId(userId).stream()
            .map(paymentMapper::toDto)
            .toList();
    }

    @Transactional
    public PaymentDto savePayment(Long userId, PaymentDto dto) {
        if (userId == null) {
            throw new RuntimeException("User ID cannot be null");
        }
        if (dto == null) {
            throw new RuntimeException("Payment data cannot be null");
        }
        
        // Validate payment fields
        validatePaymentFields(dto);
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        
        try {
            Payment payment = paymentMapper.toEntity(dto);
            payment.setUser(user);
            Payment savedPayment = paymentRepository.save(payment);
            return paymentMapper.toDto(savedPayment);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save payment: " + e.getMessage());
        }
    }

    @Transactional
    public PaymentDto updatePayment(Long paymentId, PaymentDto dto) {
        if (paymentId == null) {
            throw new RuntimeException("Payment ID cannot be null");
        }
        if (dto == null) {
            throw new RuntimeException("Payment data cannot be null");
        }
        
        // Validate payment fields
        validatePaymentFields(dto);
        
        Payment existingPayment = paymentRepository.findById(paymentId)
            .orElseThrow(() -> new RuntimeException("Payment not found with ID: " + paymentId));
        
        try {
            // Update fields
            existingPayment.setPaymentType(dto.getPaymentType());
            existingPayment.setCardNumber(dto.getCardNumber());
            existingPayment.setCardHolder(dto.getCardHolder());
            existingPayment.setExpiryDate(dto.getExpiryDate());
            existingPayment.setCvv(dto.getCvv());
            existingPayment.setUpiId(dto.getUpiId());
            
            Payment updatedPayment = paymentRepository.save(existingPayment);
            return paymentMapper.toDto(updatedPayment);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update payment: " + e.getMessage());
        }
    }
    
    private void validatePaymentFields(PaymentDto dto) {
        if (dto.getPaymentType() == null || dto.getPaymentType().trim().isEmpty()) {
            throw new RuntimeException("Payment type is required");
        }
        if ("CARD".equalsIgnoreCase(dto.getPaymentType())) {
            if (dto.getCardNumber() == null || dto.getCardNumber().trim().isEmpty()) {
                throw new RuntimeException("Card number is required for card payments");
            }
            if (dto.getCardHolder() == null || dto.getCardHolder().trim().isEmpty()) {
                throw new RuntimeException("Card holder name is required");
            }
        } else if ("UPI".equalsIgnoreCase(dto.getPaymentType())) {
            if (dto.getUpiId() == null || dto.getUpiId().trim().isEmpty()) {
                throw new RuntimeException("UPI ID is required for UPI payments");
            }
        }
    }

    public void deletePayment(Long paymentId) {
        paymentRepository.deleteById(paymentId);
    }
}
