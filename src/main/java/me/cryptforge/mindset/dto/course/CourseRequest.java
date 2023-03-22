package me.cryptforge.mindset.dto.course;

public record CourseRequest(
        String name,
        Long skillId,
        float progress,
        String certification,
        Long traineeId
) {
}
