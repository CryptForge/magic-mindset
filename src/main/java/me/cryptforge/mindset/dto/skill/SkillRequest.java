package me.cryptforge.mindset.dto.skill;

public record SkillRequest(
        boolean type,
        String name,
        String description,
        Long traineeId
) {
}
