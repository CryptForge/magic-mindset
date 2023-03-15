package me.cryptforge.mindset.dto.evaluation;

import java.util.Date;

public record EditEvaluationRequest(
        Long id,
        Date date,
        String location,
        String conclusion,
        Long evaluatorId,
        Long traineeId
) {
}
