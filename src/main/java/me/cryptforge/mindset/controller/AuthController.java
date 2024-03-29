package me.cryptforge.mindset.controller;


import me.cryptforge.mindset.dto.auth.LoginRequest;
import me.cryptforge.mindset.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/verify/{email}")
    public ResponseEntity<?> verify(@PathVariable String email) {
        return authService.verify(email);
    }
}
