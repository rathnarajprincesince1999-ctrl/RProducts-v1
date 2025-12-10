package com.rathnaproducts.backend.mapper;

import com.rathnaproducts.backend.dto.TransactionDto;
import com.rathnaproducts.backend.model.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    @Mapping(target = "user", ignore = true)
    Transaction toEntity(TransactionDto dto);
    
    TransactionDto toDto(Transaction entity);
}
