package me.cryptforge.mindset.dto.course;

public record CourseEditRequest(
        Long id,
        String name,
        Long skillId,
        float progress,
        String certificationFileName
) {
}
