package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.user.*;
import me.cryptforge.mindset.model.user.*;
import me.cryptforge.mindset.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private HREmployeeRepository hREmployeeRepository;
    @Autowired
    private CoachRepository coachRepository;
    @Autowired
    private ManagerRepository managerRepository;
    @Autowired
    private TraineeRepository traineeRepository;

    @Override
    public ResponseEntity<List<UserInfo>> getAllUsers() {
        List<UserInfo> allUsers = new ArrayList<>();
        userInfoRepository.findAll().iterator().forEachRemaining(allUsers::add);
        return ResponseEntity.ok(allUsers);
    }

    @Override
    public ResponseEntity<?> getUserFromId(String id) {
        Optional<UserInfo> user = userInfoRepository.findByUser_Id(Long.parseLong(id));
        if (user.isEmpty()) {
            return returnBadRequest("user");
        }
        return ResponseEntity.ok(user.get());
    }

    @Override
    public ResponseEntity<?> createUser(UserRequest userRequest) {
        if (userRepository.existsByEmail(userRequest.email())) {
            return ResponseEntity.badRequest().body("User with email: " + userRequest.email() + " already exists!");
        }

        // Creating user's account
        User newUser = new User(userRequest.email(), passwordEncoder.encode(userRequest.password()), userRequest.role());
        User user = userRepository.save(newUser);

        UserInfo newUserInfo = new UserInfo(user, userRequest.name(), userRequest.address(), userRequest.city());
        UserInfo userInfo = userInfoRepository.save(newUserInfo);

        checkRoleAndCreateAppropriateEntity(userInfo, userRequest.role());
        return ResponseEntity.ok().body(userInfo);
    }

    private void checkRoleAndCreateAppropriateEntity(UserInfo userInfo, User.Role role) {
        switch (role) {
            case HR -> {
                HREmployee hrEmployee = new HREmployee(userInfo);
                hREmployeeRepository.save(hrEmployee);
            }
            case COACH -> {
                Coach coach = new Coach(userInfo);
                coachRepository.save(coach);
            }
            case MANAGER -> {
                Manager manager = new Manager(userInfo);
                managerRepository.save(manager);
            }
            default -> {
                Trainee trainee = new Trainee(userInfo);
                traineeRepository.save(trainee);
            }
        }
    }

    @Override
    public ResponseEntity<?> editUserInfo(EditUserInfoRequest editUserInfoRequest) {
        Optional<User> optionalUser = userRepository.findById(editUserInfoRequest.userId());
        if (optionalUser.isEmpty()) {
            return returnBadRequest("user");
        }
        User user = optionalUser.get();
        Optional<UserInfo> optionalUserInfo = userInfoRepository.findByUser(user);
        if (optionalUserInfo.isEmpty()) {
            return returnBadRequest("userinfo");
        }
        UserInfo userInfo = optionalUserInfo.get();
        userInfo.setAddress(editUserInfoRequest.address());
        userInfo.setCity(editUserInfoRequest.city());
        userInfo.setName(editUserInfoRequest.name());
        UserInfo editedUserInfo = userInfoRepository.save(userInfo);
        return ResponseEntity.ok(editedUserInfo);
    }

    @Override
    public ResponseEntity<?> editUser(EditUserRequest editUserRequest) {
        Optional<User> optionalUser = userRepository.findById(editUserRequest.id());
        if (optionalUser.isEmpty()) {
            return returnBadRequest("user");
        }
        User user = optionalUser.get();
        user.setEmail(editUserRequest.email());
        user.setPassword(passwordEncoder.encode(editUserRequest.password()));
        user.setRole(editUserRequest.role());
        User editedUser = userRepository.save(user);
        return ResponseEntity.ok(editedUser);
    }

    @Override
    public ResponseEntity<?> changeCoachTrainee(EditCoachInTraineeRequest editCoachInTraineeRequest) {
        Optional<UserInfo> traineeUser = userInfoRepository.findByUser_Id(editCoachInTraineeRequest.traineeId());
        Optional<UserInfo> coachUser = userInfoRepository.findByUser_Id(editCoachInTraineeRequest.coachId());
        if (traineeUser.isEmpty()) {
            return returnBadRequest("trainee");
        }
        if (coachUser.isEmpty()) {
            return returnBadRequest("coach");
        }
        Optional<Trainee> optionalTrainee = traineeRepository.findByUser(traineeUser.get());
        Optional<Coach> optionalCoach = coachRepository.findByUser(coachUser.get());
        if (optionalTrainee.isEmpty()) {
            return returnBadRequestWrongRole("trainee");
        }
        if (optionalCoach.isEmpty()) {
            returnBadRequestWrongRole("coach");
        }
        Trainee trainee = optionalTrainee.get();
        trainee.setCoach(optionalCoach.get());
        Trainee editedTrainee = traineeRepository.save(trainee);
        return ResponseEntity.ok(editedTrainee);
    }

    @Override
    public ResponseEntity<?> changeManagerTrainee(EditManagerInTraineeRequest editManagerInTraineeRequest) {
        Optional<UserInfo> traineeUser = userInfoRepository.findByUser_Id(editManagerInTraineeRequest.traineeId());
        Optional<UserInfo> managerUser = userInfoRepository.findByUser_Id(editManagerInTraineeRequest.managerId());
        if (traineeUser.isEmpty()) {
            return returnBadRequest("trainee");
        }
        if (managerUser.isEmpty()) {
            return returnBadRequest("manager");
        }
        Optional<Trainee> optionalTrainee = traineeRepository.findByUser(traineeUser.get());
        Optional<Manager> optionalManager = managerRepository.findByUser(managerUser.get());
        if (optionalTrainee.isEmpty()) {
            return returnBadRequestWrongRole("trainee");
        }
        if (optionalManager.isEmpty()) {
            returnBadRequestWrongRole("coach");
        }
        Trainee trainee = optionalTrainee.get();
        trainee.setManager(optionalManager.get());
        Trainee editedTrainee = traineeRepository.save(trainee);
        return ResponseEntity.ok(editedTrainee);
    }

    private ResponseEntity<String> returnBadRequest(String type) {
        return ResponseEntity.badRequest().body("No " + type + " with that id could be found!");
    }

    private ResponseEntity<String> returnBadRequestWrongRole(String type) {
        return ResponseEntity.badRequest().body("The user you are searching isn't the role " + type);
    }
}
