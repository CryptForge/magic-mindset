package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.user.*;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.model.user.UserInfo;

import java.util.Optional;

public interface UserInfoService {

    /**
     * A method to get all users (in their info version) in the database
     *
     * @return All users in the database.
     */
    Iterable<UserInfo> getAllUsers();

    /**
     * A method to get a single user from an id
     *
     * @param id The id of the user
     * @return The user or a not found response
     */
    Optional<UserInfo> getUserFromId(Long id);

    /**
     * A method to create a single user with the correct type
     *
     * @param userRequest The request that is used to create the user, containing the type
     * @return The user if unique
     */
    UserInfo createUser(UserRequest userRequest);

    /**
     * A method to edit the UserInfo of a User
     *
     * @param editUserInfoRequest The request that contains all values that are changeable.
     * @return The changed UserInfo
     */
    UserInfo editUserInfo(EditUserInfoRequest editUserInfoRequest);

    /**
     * A method to edit the User
     *
     * @param editUserRequest The request that contains all values that are changeable
     * @return Returns the changed User
     */
    User editUser(EditUserRequest editUserRequest);

    /**
     * A method to change the coach from a trainee to another coach
     *
     * @param editCoachInTraineeRequest The id of the trainee and coach are inside this request
     * @return The edited Trainee
     */
    Trainee changeCoachTrainee(EditCoachInTraineeRequest editCoachInTraineeRequest);

    /**
     * A method to change the manager from a trainee to another manager
     *
     * @param editManagerInTraineeRequest The id of the trainee and manager are inside this request
     * @return The edited Trainee or bad request
     */
    Trainee changeManagerTrainee(EditManagerInTraineeRequest editManagerInTraineeRequest);
}
