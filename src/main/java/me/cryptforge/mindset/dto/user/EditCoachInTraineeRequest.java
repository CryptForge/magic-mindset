package me.cryptforge.mindset.dto.user;

public record EditCoachInTraineeRequest(
        Long traineeId,
        Long coachId
) {
}
