package me.cryptforge.mindset.dto.evaluation;

import java.util.Date;

public record EvaluationRequest(
        Date date,
        String location,
        String conclusion,
        Long evaluatorId,
        Long traineeId
) {
}
