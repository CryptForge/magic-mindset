package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.Course;
import me.cryptforge.mindset.model.Skill;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends CrudRepository<Course, Long> {
    Iterable<Course> findAllByTrainee_User_User_Id(Long id);

    Iterable<Course> findAllBySkill(Skill skill);

    void deleteBySkill_id(Long id);
}
