package me.cryptforge.mindset.security;

import me.cryptforge.mindset.dto.user.UserRequest;
import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.service.AuthService;
import me.cryptforge.mindset.service.TraineeService;
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
    TraineeService traineeService;

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
        long testTrainee1 = createTestUser("TestTraineeMan 1", User.Role.TRAINEE);
        long testTrainee2 = createTestUser("TestTraineeMan 2", User.Role.TRAINEE);
        long testTrainee3 = createTestUser("TestTraineeMan 3", User.Role.TRAINEE);
        long testCoach1 = createTestUser("TestCoach 1", User.Role.COACH);
        long testCoach2 = createTestUser("TestCoach 2", User.Role.COACH);
        long testManager = createTestUser("TestManagerMan", User.Role.MANAGER);

        traineeService.changeCoach(testTrainee1, testCoach2);
        traineeService.changeCoach(testTrainee2, testCoach1);
        traineeService.changeCoach(testTrainee3, testCoach1);
        traineeService.changeManager(testTrainee1, testManager);
        traineeService.changeManager(testTrainee2, testManager);
        traineeService.changeManager(testTrainee3, testManager);
    }

    private long createTestUser(String name, User.Role role) {
        var user = userService.createUser(new UserRequest(name, name, role, name, name + " Street", name + " City"));
        authService.verify(name);
        return user.id();
    }

}
