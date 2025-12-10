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
        return addressRepository.findByUserId(userId).stream()
            .map(addressMapper::toDto)
            .toList();
    }

    @Transactional
    public AddressDto saveAddress(Long userId, AddressDto dto) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Address address = addressMapper.toEntity(dto);
        address.setUser(user);
        return addressMapper.toDto(addressRepository.save(address));
    }

    public void deleteAddress(Long addressId) {
        addressRepository.deleteById(addressId);
    }

    public List<PaymentDto> getPayments(Long userId) {
        return paymentRepository.findByUserId(userId).stream()
            .map(paymentMapper::toDto)
            .toList();
    }

    @Transactional
    public PaymentDto savePayment(Long userId, PaymentDto dto) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Payment payment = paymentMapper.toEntity(dto);
        payment.setUser(user);
        return paymentMapper.toDto(paymentRepository.save(payment));
    }

    public void deletePayment(Long paymentId) {
        paymentRepository.deleteById(paymentId);
    }
}
