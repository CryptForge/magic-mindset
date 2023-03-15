package me.cryptforge.mindset.dto.course;

import me.cryptforge.mindset.model.Skill;

public record CourseResponseWithoutTrainee(
        Long id,
        Skill skill,
        float progress,
        String certification) {
}
