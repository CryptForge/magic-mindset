package me.cryptforge.mindset.dto.user;

public record EditUserRequest(
        Long id,
        String email,
        String password
) {
}
