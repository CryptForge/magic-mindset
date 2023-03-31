package me.cryptforge.mindset.dto.user;

import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.model.user.UserInfo;

public record UserInfoResponse(
        Long id,
        String name,
        String email,
        String address,
        String city,
        User.Role role
) {

    public static UserInfoResponse fromUserInfo(UserInfo userInfo) {
        return new UserInfoResponse(
                userInfo.getId(),
                userInfo.getName(),
                userInfo.getUser().getEmail(),
                userInfo.getAddress(),
                userInfo.getCity(),
                userInfo.getUser().getRole()
        );
    }

}
