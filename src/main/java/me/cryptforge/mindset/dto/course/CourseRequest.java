package me.cryptforge.mindset.dto.course;

public record CourseRequest(
        Long skillId,
        float progress,
        String certification,
        Long traineeId) {
}
