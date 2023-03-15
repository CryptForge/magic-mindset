package me.cryptforge.mindset.dto.skill;

import java.util.List;

public record SkillRequest(
        boolean type,
        String name,
        String description,
        List<Long> courseIds,
        Long traineeId
) {
}
