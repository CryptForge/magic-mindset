package me.cryptforge.mindset.dto.skill;

import me.cryptforge.mindset.model.Course;
import me.cryptforge.mindset.model.Skill;

import java.util.List;

public record SkillResponseWithoutTrainee(
        Long id,
        boolean type,
        String name,
        String description,
        List<Course> courses
) {
}
