package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.user.*;
import me.cryptforge.mindset.model.user.UserInfo;
import me.cryptforge.mindset.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserInfoController {

    @Autowired
    private UserInfoService userInfoService;

    @GetMapping("/get/all")
    public ResponseEntity<List<UserInfo>> getAllUsers() {
        return userInfoService.getAllUsers();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getUserFromId(@PathVariable String id) {
        return userInfoService.getUserFromId(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserRequest userRequest) {
        return userInfoService.createUser(userRequest);
    }

    @PostMapping("/edit/info")
    public ResponseEntity<?> editUserInfo(@RequestBody EditUserInfoRequest editUserInfoRequest) {
        return userInfoService.editUserInfo(editUserInfoRequest);
    }

    @PostMapping("/edit/user")
    public ResponseEntity<?> editUser(@RequestBody EditUserRequest editUserRequest) {
        return userInfoService.editUser(editUserRequest);
    }

    @PostMapping("/edit/trainee/coach")
    public ResponseEntity<?> editTraineeTheirCoach(@RequestBody EditCoachInTraineeRequest editCoachInTraineeRequest) {
        return userInfoService.changeCoachTrainee(editCoachInTraineeRequest);
    }

    @PostMapping("/edit/trainee/manager")
    public ResponseEntity<?> editTraineeTheirManager(@RequestBody EditManagerInTraineeRequest editManagerInTraineeRequest) {
        return userInfoService.changeManagerTrainee(editManagerInTraineeRequest);
    }
}
