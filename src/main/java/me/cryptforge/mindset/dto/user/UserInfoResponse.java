package me.cryptforge.mindset.dto.user;

import me.cryptforge.mindset.model.user.UserInfo;

public record UserInfoResponse(
        Long id,
        String name,
        String address,
        String city
) {

    public static UserInfoResponse fromUserInfo(UserInfo info) {
        return new UserInfoResponse(
                info.getId(),
                info.getName(),
                info.getAddress(),
                info.getCity()
        );
    }

}
