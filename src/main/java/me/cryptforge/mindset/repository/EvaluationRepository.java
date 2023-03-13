package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.Course;
import me.cryptforge.mindset.model.Evaluation;
import org.springframework.data.repository.CrudRepository;

public interface EvaluationRepository extends CrudRepository<Evaluation, Long> {

    Iterable<Evaluation> findAllByTrainee_User_User_Id(Long id);
}