package me.cryptforge.mindset.dto.user;

import org.springframework.web.multipart.MultipartFile;

public record EditProfileRequest(Long id,
                                 String oldEmail,
                                 String name,
                                 String email,
                                 String password,
                                 String address,
                                 String city,
                                 MultipartFile image) {
}
