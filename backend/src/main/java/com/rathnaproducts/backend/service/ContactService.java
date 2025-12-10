package com.rathnaproducts.backend.service;

import com.rathnaproducts.backend.dto.ContactDto;
import com.rathnaproducts.backend.mapper.ContactMapper;
import com.rathnaproducts.backend.model.Contact;
import com.rathnaproducts.backend.model.User;
import com.rathnaproducts.backend.repo.ContactRepository;
import com.rathnaproducts.backend.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ContactService {
    private final ContactRepository contactRepository;
    private final UserRepository userRepository;
    private final ContactMapper contactMapper;

    @Transactional
    public ContactDto submitContact(Long userId, ContactDto contactDto) {
        Contact contact = contactMapper.toEntity(contactDto);
        
        if (userId != null) {
            userRepository.findById(userId).ifPresent(contact::setUser);
        }
        
        return contactMapper.toDto(contactRepository.save(contact));
    }
}
