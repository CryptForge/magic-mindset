package me.cryptforge.mindset.dto.user;

public record EditUserInfoRequest(
        Long id,
        String name,
        String address,
        String city
) {
}
