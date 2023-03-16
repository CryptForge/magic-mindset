package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.model.user.UserInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TraineeRepository extends CrudRepository<Trainee, UserInfo> {
    Optional<Trainee> findByUser(UserInfo userInfo);

    Optional<Trainee> findByUser_User_Id(Long id);
}