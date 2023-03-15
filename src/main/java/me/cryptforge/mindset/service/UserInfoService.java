package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.user.*;
import me.cryptforge.mindset.model.user.UserInfo;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserInfoService {

    /**
     * A method to get all users (in their info version) in the database
     *
     * @return - Returns all users in the database.
     */
    ResponseEntity<List<UserInfo>> getAllUsers();

    /**
     * A method to get a single user from an id
     *
     * @param id - The id of the user
     * @return - Returns the user or a not found response
     */
    ResponseEntity<?> getUserFromId(String id);

    /**
     * A method to create a single user with the correct type
     *
     * @param userRequest - The request that is used to create the user, containing the type
     * @return - Returns the user if unique
     */
    ResponseEntity<?> createUser(UserRequest userRequest);

    /**
     * A method to edit the UserInfo of a User
     *
     * @param editUserInfoRequest - The request that contains all values that are changeable.
     * @return - Returns the changed UserInfo
     */
    ResponseEntity<?> editUserInfo(EditUserInfoRequest editUserInfoRequest);

    /**
     * A method to edit the User
     *
     * @param editUserRequest - The request that contains all values that are changeable
     * @return - Returns the changed User
     */
    ResponseEntity<?> editUser(EditUserRequest editUserRequest);

    /**
     * A method to change the coach from a trainee to another coach
     *
     * @param editCoachInTraineeRequest - The id of the trainee and coach are inside this request
     * @return - Returns the edited Trainee or bad request
     */
    ResponseEntity<?> changeCoachTrainee(EditCoachInTraineeRequest editCoachInTraineeRequest);

    /**
     * A method to change the manager from a trainee to another manager
     *
     * @param editManagerInTraineeRequest - The id of the trainee and manager are inside this request
     * @return - Returns the edited Trainee or bad request
     */
    ResponseEntity<?> changeManagerTrainee(EditManagerInTraineeRequest editManagerInTraineeRequest);
}
