package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.Skill;
import me.cryptforge.mindset.model.SkillReport;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillReportRepository extends CrudRepository<SkillReport, Long> {

    Iterable<SkillReport> findAllBySkill(Skill skill);
}

