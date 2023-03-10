package me.cryptforge.mindset.dto.auth;

public record LoginRequest(
        String email,
        String password
) {
}
