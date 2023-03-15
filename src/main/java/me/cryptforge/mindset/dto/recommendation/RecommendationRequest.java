package me.cryptforge.mindset.dto.recommendation;

import java.util.Date;

public record RecommendationRequest(
        Date date,
        String message,
        Long traineeId

) {
}
