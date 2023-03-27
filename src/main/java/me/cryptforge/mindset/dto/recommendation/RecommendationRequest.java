package me.cryptforge.mindset.dto.recommendation;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public record RecommendationRequest(
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        Date date,
        String message,
        Long traineeId
) {
}
