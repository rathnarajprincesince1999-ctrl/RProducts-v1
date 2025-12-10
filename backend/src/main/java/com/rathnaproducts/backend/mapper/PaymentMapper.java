package com.rathnaproducts.backend.mapper;

import com.rathnaproducts.backend.dto.PaymentDto;
import com.rathnaproducts.backend.model.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PaymentMapper {
    @Mapping(target = "user", ignore = true)
    Payment toEntity(PaymentDto dto);
    
    PaymentDto toDto(Payment entity);
}
