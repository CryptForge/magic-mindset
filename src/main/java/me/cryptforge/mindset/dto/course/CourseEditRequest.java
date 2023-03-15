package me.cryptforge.mindset.dto.course;

public record CourseEditRequest(
        Long id,
        Long skillId,
        float progress,
        String certification) {
}
