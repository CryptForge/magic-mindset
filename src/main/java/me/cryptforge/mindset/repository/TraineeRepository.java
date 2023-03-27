package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.user.Coach;
import me.cryptforge.mindset.model.user.Manager;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.model.user.UserInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TraineeRepository extends CrudRepository<Trainee, Long> {

    Optional<Trainee> findByUser(UserInfo userInfo);

    Iterable<Trainee> findAllByCoach(Coach coach);

    Iterable<Trainee> findAllByManager(Manager manager);

}