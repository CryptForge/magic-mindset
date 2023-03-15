package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.Course;
import org.springframework.data.repository.CrudRepository;

public interface CourseRepository extends CrudRepository<Course, Long> {
    Iterable<Course> findAllByTrainee_User_User_Id(Long id);

    void deleteBySkill_id(Long id);
}
