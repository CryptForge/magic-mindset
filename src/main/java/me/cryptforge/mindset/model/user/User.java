package me.cryptforge.mindset.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", length = 16)
    private Role role;

    /**
     * Enum containing valid user roles.
     */
    public enum Role {
        TRAINEE, COACH, MANAGER, HR;

        public GrantedAuthority asAuthority() {
            return new SimpleGrantedAuthority(asString());
        }

        public String asString() {
            return name();
        }
    }
}