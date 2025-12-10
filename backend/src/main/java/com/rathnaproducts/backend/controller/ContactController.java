package com.rathnaproducts.backend.controller;

import com.rathnaproducts.backend.dto.ContactDto;
import com.rathnaproducts.backend.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {
    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ContactDto> submitContact(@RequestParam(required = false) Long userId, @RequestBody @Valid ContactDto contactDto) {
        return ResponseEntity.ok(contactService.submitContact(userId, contactDto));
    }
}
