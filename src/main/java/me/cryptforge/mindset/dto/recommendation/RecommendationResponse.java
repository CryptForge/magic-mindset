package me.cryptforge.mindset.dto.recommendation;

import me.cryptforge.mindset.model.Recommendation;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public record RecommendationResponse(
        Long id,
        Long trainee,
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        Date date,
        String message
) {

    public static RecommendationResponse fromRecommendation(Recommendation recommendation) {
        return new RecommendationResponse(
                recommendation.getId(),
                recommendation.getTrainee().getId(),
                recommendation.getDate(),
                recommendation.getMessage()
        );
    }

}
