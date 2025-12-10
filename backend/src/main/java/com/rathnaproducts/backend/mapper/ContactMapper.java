package com.rathnaproducts.backend.mapper;

import com.rathnaproducts.backend.dto.ContactDto;
import com.rathnaproducts.backend.model.Contact;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ContactMapper {
    @Mapping(target = "user", ignore = true)
    Contact toEntity(ContactDto dto);
    
    ContactDto toDto(Contact entity);
}
