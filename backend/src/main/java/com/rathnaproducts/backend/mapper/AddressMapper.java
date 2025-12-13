package com.rathnaproducts.backend.mapper;

import com.rathnaproducts.backend.dto.AddressDto;
import com.rathnaproducts.backend.model.Address;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "id", ignore = true)
    Address toEntity(AddressDto dto);
    
    AddressDto toDto(Address entity);
}