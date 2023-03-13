package me.cryptforge.mindset.dto.user;

public record EditUserInfoRequest(
        Long userId,
        String name,
        String address,
        String city
) {
}
