package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.user.*;
import me.cryptforge.mindset.exception.EntityAlreadyExistsException;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.exception.RoleMismatchException;
import me.cryptforge.mindset.model.user.*;
import me.cryptforge.mindset.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
    private HREmployeeRepository hrEmployeeRepository;
    @Autowired
    private CoachRepository coachRepository;
    @Autowired
    private ManagerRepository managerRepository;
    @Autowired
    private TraineeRepository traineeRepository;

    @Override
    public Iterable<UserInfo> getAllUsers() {
        return userInfoRepository.findAll();
    }

    @Override
    public Optional<UserInfo> getUserFromId(Long id) {
        return userInfoRepository.findByUser_Id(id);
    }

    @Override
    public UserInfo createUser(UserRequest userRequest) {
        if (userRepository.existsByEmail(userRequest.email())) {
            throw new EntityAlreadyExistsException("User with email \"" + userRequest.email() + "\" already exists!");
        }

        // Creating user's account
        User user = new User(userRequest.email(), passwordEncoder.encode(userRequest.password()), userRequest.role());
        user = userRepository.save(user);

        UserInfo userInfo = new UserInfo(user, userRequest.name(), userRequest.address(), userRequest.city());
        userInfo = userInfoRepository.save(userInfo);

        createEntityFromRole(userInfo, userRequest.role());
        return userInfo;
    }

    private void createEntityFromRole(UserInfo userInfo, User.Role role) {
        switch (role) {
            case HR -> hrEmployeeRepository.save(new HREmployee(userInfo));
            case COACH -> coachRepository.save(new Coach(userInfo));
            case MANAGER -> managerRepository.save(new Manager(userInfo));
            case TRAINEE -> traineeRepository.save(new Trainee(userInfo));
        }
    }

    @Override
    public UserInfo editUserInfo(EditUserInfoRequest request) {
        final User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new EntityNotFoundException("user"));
        final UserInfo userInfo = userInfoRepository.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("userInfo"));

        userInfo.setAddress(request.address());
        userInfo.setCity(request.city());
        userInfo.setName(request.name());

        return userInfoRepository.save(userInfo);
    }

    @Override
    public User editUser(EditUserRequest editUserRequest) {
        final User user = userRepository.findById(editUserRequest.id())
                .orElseThrow(() -> new EntityNotFoundException("user"));

        user.setEmail(editUserRequest.email());
        user.setPassword(passwordEncoder.encode(editUserRequest.password()));
        user.setRole(editUserRequest.role());

        return userRepository.save(user);
    }

    @Override
    public Trainee changeCoachTrainee(EditCoachInTraineeRequest request) {
        final UserInfo traineeUser = userInfoRepository.findByUser_Id(request.traineeId())
                .orElseThrow(() -> new EntityNotFoundException("trainee"));
        final UserInfo coachUser = userInfoRepository.findByUser_Id(request.coachId())
                .orElseThrow(() -> new EntityNotFoundException(("coach")));

        final Trainee trainee = traineeRepository.findByUser(traineeUser)
                .orElseThrow(RoleMismatchException::new);
        final Coach coach = coachRepository.findByUser(coachUser)
                .orElseThrow(RoleMismatchException::new);

        trainee.setCoach(coach);

        return traineeRepository.save(trainee);
    }

    @Override
    public Trainee changeManagerTrainee(EditManagerInTraineeRequest request) {
        final UserInfo traineeUser = userInfoRepository.findByUser_Id(request.traineeId())
                .orElseThrow(() -> new EntityNotFoundException("trainee"));
        final UserInfo managerUser = userInfoRepository.findByUser_Id(request.managerId())
                .orElseThrow(() -> new EntityNotFoundException("manager"));

        final Trainee trainee = traineeRepository.findByUser(traineeUser)
                .orElseThrow(RoleMismatchException::new);
        final Manager manager = managerRepository.findByUser(managerUser)
                .orElseThrow(RoleMismatchException::new);

        trainee.setManager(manager);

        return traineeRepository.save(trainee);
    }
}
