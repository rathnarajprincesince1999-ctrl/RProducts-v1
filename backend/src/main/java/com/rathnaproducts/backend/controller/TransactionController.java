package com.rathnaproducts.backend.controller;

import com.rathnaproducts.backend.dto.TransactionDto;
import com.rathnaproducts.backend.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<TransactionDto>> getUserTransactions(@PathVariable Long userId) {
        return ResponseEntity.ok(transactionService.getUserTransactions(userId));
    }
}
