package me.cryptforge.mindset.dto.auth;

public record LoginResponse(String token, String username, String role) {
}
