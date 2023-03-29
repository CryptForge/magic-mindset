package me.cryptforge.mindset.dto.user.trainee;

import me.cryptforge.mindset.model.user.Trainee;

public record CompactTraineeResponse(
        Long id,
        String username,
        Long coach,
        Long manager
) {

    public static CompactTraineeResponse fromTrainee(Trainee trainee) {
        final Long coachId = trainee.getCoach() == null ? null : trainee.getCoach().getId();
        final Long managerId = trainee.getManager() == null ? null : trainee.getManager().getId();
        return new CompactTraineeResponse(
                trainee.getId(),
                trainee.getUser().getName(),
                coachId,
                managerId
        );
    }

}
