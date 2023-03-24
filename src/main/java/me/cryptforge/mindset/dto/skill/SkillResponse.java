package me.cryptforge.mindset.dto.skill;

import me.cryptforge.mindset.model.Skill;

public record SkillResponse(
        Long id,
        boolean type,
        String name,
        String description
) {

    public static SkillResponse fromSkill(Skill skill) {
        return new SkillResponse(
                skill.getId(),
                skill.isType(),
                skill.getName(),
                skill.getDescription()
        );
    }
}
