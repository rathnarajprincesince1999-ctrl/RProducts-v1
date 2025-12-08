package com.rathnaproducts.backend.service;

import com.rathnaproducts.backend.config.JwtUtil;
import com.rathnaproducts.backend.dto.AdminLoginRequest;
import com.rathnaproducts.backend.dto.AdminResponse;
import com.rathnaproducts.backend.mapper.AdminMapper;
import com.rathnaproducts.backend.model.Admin;
import com.rathnaproducts.backend.repo.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final AdminMapper adminMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AdminResponse login(AdminLoginRequest request) {
        Admin admin = adminRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        AdminResponse response = adminMapper.toResponse(admin);
        response.setToken(jwtUtil.generateToken(admin.getUsername()));
        return response;
    }
}
