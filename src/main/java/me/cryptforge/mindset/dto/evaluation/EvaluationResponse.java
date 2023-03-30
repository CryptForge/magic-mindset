package me.cryptforge.mindset.dto.evaluation;

import me.cryptforge.mindset.model.Evaluation;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public record EvaluationResponse(
        Long id,
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        Date date,
        String location,
        String conclusion,
        Long evaluator,
        Long trainee
) {

    public static EvaluationResponse fromEvaluation(Evaluation evaluation) {
        return new EvaluationResponse(
                evaluation.getId(),
                evaluation.getDate(),
                evaluation.getLocation(),
                evaluation.getConclusionFileName(),
                evaluation.getEvaluator().getId(),
                evaluation.getTrainee().getId()
        );
    }

}
