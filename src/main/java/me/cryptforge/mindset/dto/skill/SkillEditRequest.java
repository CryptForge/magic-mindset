package me.cryptforge.mindset.dto.skill;

public record SkillEditRequest(
        Long id,
        boolean type,
        String name,
        String description
) {
}
