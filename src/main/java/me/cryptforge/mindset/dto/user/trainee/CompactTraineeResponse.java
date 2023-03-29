package me.cryptforge.mindset.dto.user.trainee;

import me.cryptforge.mindset.model.user.Trainee;

public record CompactTraineeResponse(
        Long id,
        String username,
        Long coach,
        Long manager
) {

    public static CompactTraineeResponse fromTrainee(Trainee trainee) {
        if (trainee.getCoach() == null && trainee.getManager() == null) {
            return new CompactTraineeResponse(
                    trainee.getUser().getId(),
                    trainee.getUser().getName(),
                    null,
                    null
            );
        } else if(trainee.getCoach() == null) {
            return new CompactTraineeResponse(
                    trainee.getUser().getId(),
                    trainee.getUser().getName(),
                    null,
                    trainee.getManager().getId()
            );
        } else if(trainee.getManager() == null) {
            return new CompactTraineeResponse(
                    trainee.getUser().getId(),
                    trainee.getUser().getName(),
                    trainee.getCoach().getId(),
                    null
            );
        }
        return new CompactTraineeResponse(
                trainee.getUser().getId(),
                trainee.getUser().getName(),
                trainee.getCoach().getId(),
                trainee.getManager().getId()
        );
    }

}
