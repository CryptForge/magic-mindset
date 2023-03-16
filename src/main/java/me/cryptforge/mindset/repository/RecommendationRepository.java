package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.Recommendation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendationRepository extends CrudRepository<Recommendation, Long> {

    Iterable<Recommendation> findAllByTrainee_User_User_Id(Long id);
}