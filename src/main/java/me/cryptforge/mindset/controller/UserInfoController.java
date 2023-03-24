package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.user.*;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.model.user.UserInfo;
import me.cryptforge.mindset.security.EntityUserDetails;
import me.cryptforge.mindset.service.UserInfoService;
import me.cryptforge.mindset.util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<UserInfo> getUserFromId(@PathVariable Long id, @AuthenticationPrincipal EntityUserDetails user) {
        AuthUtil.checkAccess(id, user, User.Role.TRAINEE);
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

    @RequestMapping(value = "/profile/edit", method = RequestMethod.POST)
    public String editProfile(@RequestParam("id") Long id,
                              @RequestParam(value = "name", required = false) String name,
                              @RequestParam(value = "email", required = false) String email,
                              @RequestParam(value = "password", required = false) String password,
                              @RequestParam(value = "address", required = false) String address,
                              @RequestParam(value = "city", required = false) String city,
                              @RequestParam(value = "image", required = false) MultipartFile image) {
        return userInfoService.editProfile(new EditProfileRequest(id, name, email, password, address, city, image));
    }

    @GetMapping(value = "/get/profile/{id}")
    public UserProfile getProfile(@PathVariable Long id) {
        return userInfoService.getProfile(id);
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
