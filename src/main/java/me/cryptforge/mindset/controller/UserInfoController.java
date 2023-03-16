package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.user.*;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.model.user.UserInfo;
import me.cryptforge.mindset.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserInfoController {

    @Autowired
    private UserInfoService userInfoService;

    @GetMapping("/get/all")
    public Iterable<UserInfo> getAllUsers() {
        return userInfoService.getAllUsers();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<UserInfo> getUserFromId(@PathVariable Long id) {
        return ResponseEntity.of(userInfoService.getUserFromId(id));
    }

    @PostMapping("/create")
    public UserInfo createUser(@RequestBody UserRequest userRequest) {
        return userInfoService.createUser(userRequest);
    }

    @PostMapping("/edit/info")
    public UserInfo editUserInfo(@RequestBody EditUserInfoRequest editUserInfoRequest) {
        return userInfoService.editUserInfo(editUserInfoRequest);
    }

    @PostMapping("/edit/user")
    public User editUser(@RequestBody EditUserRequest editUserRequest) {
        return userInfoService.editUser(editUserRequest);
    }

    @PostMapping("/edit/trainee/coach")
    public Trainee editTraineeTheirCoach(@RequestBody EditCoachInTraineeRequest editCoachInTraineeRequest) {
        return userInfoService.changeCoachTrainee(editCoachInTraineeRequest);
    }

    @PostMapping("/edit/trainee/manager")
    public Trainee editTraineeTheirManager(@RequestBody EditManagerInTraineeRequest editManagerInTraineeRequest) {
        return userInfoService.changeManagerTrainee(editManagerInTraineeRequest);
    }
}
