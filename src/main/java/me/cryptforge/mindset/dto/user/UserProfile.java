package me.cryptforge.mindset.dto.user;

public record UserProfile(Long id,
                          String name,
                          String email,
                          String image) {
}
