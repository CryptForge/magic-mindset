package me.cryptforge.mindset.dto.course;

public record CourseEditRequest(
        Long id,
        String name,
        float progress
) {
}
