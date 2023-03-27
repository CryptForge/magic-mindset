package me.cryptforge.mindset.dto.user;

public record UserChangeInfoResponse(Long id,
                                     String newName,
                                     String newEmail,
                                     String newAddress,
                                     String newCity,
                                     String oldName,
                                     String oldEmail,
                                     String oldAddress,
                                     String oldCity) {
}
