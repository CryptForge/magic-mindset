package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.model.user.UserInfo;
import org.springframework.data.repository.CrudRepository;

public interface TraineeRepository extends CrudRepository<Trainee, UserInfo> {
}