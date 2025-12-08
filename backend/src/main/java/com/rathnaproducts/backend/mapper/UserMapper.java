package com.rathnaproducts.backend.mapper;

import com.rathnaproducts.backend.dto.SignupRequest;
import com.rathnaproducts.backend.dto.UserResponse;
import com.rathnaproducts.backend.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "token", ignore = true)
    UserResponse toResponse(User user);
    
    @Mapping(target = "id", ignore = true)
    User toEntity(SignupRequest request);
}
