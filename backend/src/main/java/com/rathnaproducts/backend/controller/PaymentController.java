package com.rathnaproducts.backend.controller;

import com.rathnaproducts.backend.dto.PaymentDto;
import com.rathnaproducts.backend.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/{userId}")
    public ResponseEntity<PaymentDto> savePayment(@PathVariable Long userId, @RequestBody @Valid PaymentDto paymentDto) {
        return ResponseEntity.ok(paymentService.savePayment(userId, paymentDto));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<PaymentDto>> getUserPayments(@PathVariable Long userId) {
        return ResponseEntity.ok(paymentService.getUserPayments(userId));
    }

    @DeleteMapping("/{paymentId}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long paymentId) {
        paymentService.deletePayment(paymentId);
        return ResponseEntity.ok().build();
    }
}
