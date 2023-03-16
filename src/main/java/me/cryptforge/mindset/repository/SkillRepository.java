package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.Skill;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends CrudRepository<Skill, Long> {
    Iterable<Skill> findAllByTrainee_User_User_Id(Long id);
}
