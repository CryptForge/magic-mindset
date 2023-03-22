package me.cryptforge.mindset.security;

import jakarta.mail.MessagingException;
import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.repository.UserRepository;
import me.cryptforge.mindset.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class Setup {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserInfoService userService;

    @Autowired
    MailService mailService;

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
        }

        try {
            mailService.sendEvaluationMail("rebeccadj2003@gmail.com", "Rebecca de Jong", "12-03-2024 15:00", "Home");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

}
