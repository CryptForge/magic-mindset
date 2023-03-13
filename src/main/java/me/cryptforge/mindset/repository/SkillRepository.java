package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.Course;
import me.cryptforge.mindset.model.Skill;
import org.springframework.data.repository.CrudRepository;

public interface SkillRepository extends CrudRepository<Skill, Long> {
}