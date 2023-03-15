package me.cryptforge.mindset.dto.user;

import me.cryptforge.mindset.model.user.User;

public record EditUserRequest(
        Long id,
        String email,
        String password,
        User.Role role
) {
}
