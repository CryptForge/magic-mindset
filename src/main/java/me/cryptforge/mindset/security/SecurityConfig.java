package me.cryptforge.mindset.security;

import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.service.EntityUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    EntityUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        final String[] allRoles = Arrays.stream(User.Role.values()).map(User.Role::name).toArray(String[]::new);

        http.cors();
        http.authenticationProvider(authenticationProvider());
        http.userDetailsService(userDetailsService);
        http.csrf().disable();
        http.authorizeHttpRequests()
                .requestMatchers("/api/auth/**")
                .permitAll()
                .requestMatchers("/api/coach")
                .hasRole(User.Role.COACH.asString())
                .requestMatchers("/api/manager")
                .hasRole(User.Role.MANAGER.asString())
                .requestMatchers("/api/trainee")
                .hasRole(User.Role.TRAINEE.asString())
                .requestMatchers("/api/user")
                .hasAnyRole(allRoles)
                .anyRequest()
                .authenticated();

        http.httpBasic().disable();
        http.formLogin().disable();

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        final DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

}
