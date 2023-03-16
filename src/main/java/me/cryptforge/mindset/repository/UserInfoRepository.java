package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.model.user.UserInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInfoRepository extends CrudRepository<UserInfo, User> {
    Optional<UserInfo> findByUser(User user);

    Optional<UserInfo> findByUser_Id(long id);
}