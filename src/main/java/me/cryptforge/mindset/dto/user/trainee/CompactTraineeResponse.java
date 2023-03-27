package me.cryptforge.mindset.dto.user.trainee;

import me.cryptforge.mindset.model.user.Trainee;

public record CompactTraineeResponse(
        Long id,
        String username,
        Long coach,
        Long manager
) {

    public static CompactTraineeResponse fromTrainee(Trainee trainee) {
        return new CompactTraineeResponse(
                trainee.getId(),
                trainee.getUser().getName(),
                trainee.getCoach().getId(),
                trainee.getManager().getId()
        );
    }

}
