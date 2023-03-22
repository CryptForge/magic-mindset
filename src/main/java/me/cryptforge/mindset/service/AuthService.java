package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.auth.LoginRequest;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<?> login(LoginRequest request);

    ResponseEntity<?> verify(String email);

}
