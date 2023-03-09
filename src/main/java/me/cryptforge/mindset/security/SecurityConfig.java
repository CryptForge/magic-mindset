package me.cryptforge.mindset.security;

import me.cryptforge.mindset.model.user.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        final String[] allRoles = Arrays.stream(User.Role.values()).map(User.Role::name).toArray(String[]::new);

        return http
                .cors()
                .and()
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/api/coach")
                .hasRole(User.Role.COACH.name())
                .requestMatchers("/api/manager")
                .hasRole(User.Role.MANAGER.name())
                .requestMatchers("/api/trainee")
                .hasRole(User.Role.TRAINEE.name())
                .requestMatchers("/api/user")
                .hasAnyRole(allRoles)
                .requestMatchers("/**")
                .permitAll()
                .and()
//                .userDetailsService()
                .httpBasic()
                .and()
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); 
    }

}
