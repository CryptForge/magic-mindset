package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.user.*;
import me.cryptforge.mindset.model.user.User;
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

    @GetMapping("/all")
    public Iterable<UserInfoResponse> getAllUsers() {
        return userInfoService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserInfoResponse> getUserFromId(@PathVariable Long id, @AuthenticationPrincipal EntityUserDetails user) {
        AuthUtil.checkAccess(id, user, User.Role.TRAINEE);
        return ResponseEntity.of(userInfoService.getUserFromId(id));
    }

    @PostMapping("/create")
    public UserInfoResponse createUser(@RequestBody UserRequest userRequest) {
        return userInfoService.createUser(userRequest);
    }

    @PostMapping("/edit/info")
    public UserInfoResponse editUserInfo(@RequestBody EditUserInfoRequest editUserInfoRequest) {
        return userInfoService.editUserInfo(editUserInfoRequest);
    }

    @PostMapping("/edit/user")
    public ResponseEntity<String> editUser(@RequestBody EditUserRequest editUserRequest) {
        userInfoService.editUser(editUserRequest);
        return ResponseEntity.ok("Edited user");
    }

    @RequestMapping(value = "/profile/edit", method = RequestMethod.POST)
    public String editProfile(@RequestParam("id") Long id,
                              @RequestParam(value = "name", required = false) String name,
                              @RequestParam(value = "oldEmail", required = false) String oldEmail,
                              @RequestParam(value = "email", required = false) String email,
                              @RequestParam(value = "password", required = false) String password,
                              @RequestParam(value = "address", required = false) String address,
                              @RequestParam(value = "city", required = false) String city,
                              @RequestParam(value = "image", required = false) MultipartFile image) {
        return userInfoService.editProfile(new EditProfileRequest(id, oldEmail, name, email, password, address, city, image));
    }

    @GetMapping(value = "/profile/{id}")
    public UserProfile getProfile(@PathVariable Long id) {
        return userInfoService.getProfile(id);
    }

}
