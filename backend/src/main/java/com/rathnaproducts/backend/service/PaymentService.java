package com.rathnaproducts.backend.service;

import com.rathnaproducts.backend.dto.PaymentDto;
import com.rathnaproducts.backend.mapper.PaymentMapper;
import com.rathnaproducts.backend.model.Payment;
import com.rathnaproducts.backend.model.User;
import com.rathnaproducts.backend.repo.PaymentRepository;
import com.rathnaproducts.backend.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final PaymentMapper paymentMapper;

    @Transactional
    public PaymentDto savePayment(Long userId, PaymentDto paymentDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Payment payment = paymentMapper.toEntity(paymentDto);
        payment.setUser(user);
        
        return paymentMapper.toDto(paymentRepository.save(payment));
    }

    public List<PaymentDto> getUserPayments(Long userId) {
        return paymentRepository.findByUserId(userId).stream()
                .map(paymentMapper::toDto)
                .toList();
    }

    public void deletePayment(Long paymentId) {
        paymentRepository.deleteById(paymentId);
    }
}
