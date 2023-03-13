package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.user.Manager;
import me.cryptforge.mindset.model.user.UserInfo;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ManagerRepository extends CrudRepository<Manager, Long> {
    Optional<Manager> findByUser(UserInfo userInfo);
}