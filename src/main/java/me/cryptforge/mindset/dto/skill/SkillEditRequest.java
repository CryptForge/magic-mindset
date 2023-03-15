package me.cryptforge.mindset.dto.skill;

import java.util.List;

public record SkillEditRequest(
        Long id,
        boolean type,
        String name,
        String description,
        List<Long> courseIds
) {
}
