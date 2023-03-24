package me.cryptforge.mindset.dto.course;

public record CourseEditRequest(
        Long id,
        String name,
        Long skill,
        float progress,
        String certificationFileName
) {
}
