package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.user.*;

import java.util.Optional;

public interface UserInfoService {

    /**
     * A method to get all users (in their info version) in the database
     *
     * @return All users in the database.
     */
    Iterable<UserInfoResponse> getAllUsers();

    /**
     * A method to get a single user from an id
     *
     * @param id The id of the user
     * @return The user or a not found response
     */
    Optional<UserInfoResponse> getUserFromId(Long id);

    /**
     * A method to create a single user with the correct type
     *
     * @param userRequest The request that is used to create the user, containing the type
     * @return The user if unique
     */
    UserInfoResponse createUser(UserRequest userRequest);

    /**
     * A method to edit the UserInfo of a User
     *
     * @param editUserInfoRequest The request that contains all values that are changeable.
     * @return The changed UserInfo
     */
    UserInfoResponse editUserInfo(EditUserInfoRequest editUserInfoRequest);

    /**
     * A method to edit the User
     *
     * @param editUserRequest The request that contains all values that are changeable
     */
    void editUser(EditUserRequest editUserRequest);

    String editProfile(EditProfileRequest editProfileRequest);

    UserProfile getProfile(Long id);
}
