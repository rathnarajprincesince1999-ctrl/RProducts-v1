package com.rathnaproducts.backend.service;

import com.rathnaproducts.backend.dto.TransactionDto;
import com.rathnaproducts.backend.mapper.TransactionMapper;
import com.rathnaproducts.backend.repo.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;

    public List<TransactionDto> getUserTransactions(Long userId) {
        if (userId == null) {
            throw new RuntimeException("User ID cannot be null");
        }
        return transactionRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(transactionMapper::toDto)
                .toList();
    }
}
