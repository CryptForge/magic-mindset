package me.cryptforge.mindset.dto.user;

import me.cryptforge.mindset.model.user.User;

public record UserRequest(
        String email,
        String password,
        User.Role role,
        String name,
        String address,
        String city
) {
}
