package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.Evaluation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationRepository extends CrudRepository<Evaluation, Long> {

    Iterable<Evaluation> findAllByTrainee_User_User_Id(Long id);
}