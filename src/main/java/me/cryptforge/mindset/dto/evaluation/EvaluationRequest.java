package me.cryptforge.mindset.dto.evaluation;

import java.util.Date;

public record EvaluationRequest(
        Date date,
        String location,
        Long evaluatorId,
        Long traineeId,
        boolean isTrainee
) {
}
