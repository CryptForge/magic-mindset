package me.cryptforge.mindset.dto.course;

import me.cryptforge.mindset.model.Course;

public record CourseResponse(
        Long id,
        String name,
        float progress,
        String certificationFileName
) {

    public static CourseResponse fromCourse(Course course) {
        return new CourseResponse(
                course.getId(),
                course.getName(),
                course.getProgress(),
                course.getCertificationFileName()
        );
    }

}
