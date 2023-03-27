package me.cryptforge.mindset.dto.user.trainee;

public record EditCoachRequest(
        Long traineeId,
        Long coachId
) {
}
