package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.user.Coach;
import me.cryptforge.mindset.model.user.UserInfo;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CoachRepository extends CrudRepository<Coach, Long> {
    Optional<Coach> findByUser(UserInfo userInfo);
}