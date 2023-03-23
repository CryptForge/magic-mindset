package me.cryptforge.mindset.dto.user;

import org.springframework.web.multipart.MultipartFile;

public record EditProfileRequest(Long id,
                                 String name,
                                 String email,
                                 String password,
                                 MultipartFile image) {
}
