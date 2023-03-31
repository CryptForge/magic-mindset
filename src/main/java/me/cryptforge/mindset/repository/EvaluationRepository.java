package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.Evaluation;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.model.user.UserInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationRepository extends CrudRepository<Evaluation, Long> {

    Iterable<Evaluation> findAllByTrainee(Trainee trainee);

    Iterable<Evaluation> findAllByEvaluator(UserInfo userInfo);
}