package me.cryptforge.mindset.dto.user;

public record EditManagerInTraineeRequest(
        Long traineeId,
        Long managerId
) {
}
