package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.auth.LoginRequest;
import me.cryptforge.mindset.dto.auth.LoginResponse;
import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.repository.UserRepository;
import me.cryptforge.mindset.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    EntityUserDetailsService userDetailsService;

    @Autowired
    JwtTokenUtil tokenUtil;

    @Override
    public ResponseEntity<?> login(LoginRequest request) {
        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.email(),
                request.password()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.email());
        final User user = userRepository.findByEmail(request.email()).orElseThrow();

        if (!user.isVerified()) {
            return ResponseEntity.badRequest().body("User isn't verified yet!");
        }

        final String token = tokenUtil.generateToken(userDetails);

        return ResponseEntity.accepted().body(new LoginResponse(
                token,
                userDetails.getUsername(),
                user.getRole().name()
        ));
    }

    @Override
    public ResponseEntity<?> verify(String email) {
        final User user = userRepository.findByEmail(email).orElseThrow();

        if (user.isVerified()) {
            return ResponseEntity.badRequest().body("Already verified!");
        }

        user.setVerified(true);
        userRepository.save(user);

        return ResponseEntity.accepted().body("User verified, login now!");
    }
}
