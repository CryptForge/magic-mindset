package me.cryptforge.mindset.dto.user.trainee;

public record EditManagerRequest(
        Long traineeId,
        Long managerId
) {
}
