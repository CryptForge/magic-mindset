package me.cryptforge.mindset.dto.auth;

public record LoginResponse(
        long id,
        String token,
        String username,
        String role
) {
}
