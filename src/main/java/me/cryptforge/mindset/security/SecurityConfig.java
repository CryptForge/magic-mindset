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
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    EntityUserDetailsService userDetailsService;

    @Autowired
    JwtRequestFilter requestFilter;

    @Autowired
    JwtAuthenticationEntryEndpoint authenticationEntryEndpoint;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        final String[] allRoles = Arrays.stream(User.Role.values()).map(User.Role::name).toArray(String[]::new);

        http.authenticationProvider(authenticationProvider());

        http.cors();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.exceptionHandling().authenticationEntryPoint(authenticationEntryEndpoint);
        http.csrf().disable();
        http.httpBasic().disable();
        http.formLogin().disable();

        http.authorizeHttpRequests()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/user/profile/**").authenticated()
                .requestMatchers("/get/profile/**").authenticated()
                .requestMatchers("/api/user/**").hasRole(User.Role.HR.asString())
                .anyRequest().authenticated();

        http.addFilterBefore(requestFilter, UsernamePasswordAuthenticationFilter.class);

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
