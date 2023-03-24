package me.cryptforge.mindset.util;

import me.cryptforge.mindset.exception.UnauthorizedException;
import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.security.EntityUserDetails;

import java.util.Arrays;
import java.util.Objects;

public final class AuthUtil {

    private AuthUtil() {}

    /**
     * Check is a user is allowed to access a certain resource
     * @param ownerId User id of resource owner
     * @param user User to check
     * @param appliesTo Which roles this check applies to
     * @throws UnauthorizedException When the check fails
     */
    public static void checkAccess(long ownerId, EntityUserDetails user, User.Role... appliesTo) throws UnauthorizedException {
        final boolean doesApply = Arrays.stream(appliesTo)
                .anyMatch(role -> user.getAuthorities().contains(role.asAuthority()));
        if(doesApply && !Objects.equals(ownerId, user.getId())) {
            throw new UnauthorizedException();
        }
    }

}
