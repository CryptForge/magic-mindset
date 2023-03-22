package me.cryptforge.mindset.security;

import me.cryptforge.mindset.dto.user.UserRequest;
import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.service.AuthService;
import me.cryptforge.mindset.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class Setup {

    @Autowired
    UserInfoService userService;

    @Autowired
    AuthService authService;

    @EventListener
    @Transactional
    public void onReadyEvent(ApplicationReadyEvent event) {
        // Add a user for every role for development purposes
        for (User.Role role : User.Role.values()) {
            final String username = role.asString().toLowerCase();
            userService.createUser(new UserRequest(
                    username,
                    username,
                    role,
                    username,
                    username + " city",
                    username + " street"
            ));
            authService.verify(username);
        }
    }

}
