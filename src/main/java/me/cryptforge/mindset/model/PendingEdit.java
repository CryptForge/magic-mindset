package me.cryptforge.mindset.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "pending_edit")
public class PendingEdit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "old_email", nullable = false, unique = true)
    private String oldEmail;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "city", nullable = false)
    private String city;

    public PendingEdit(String oldEmail, String email, String name, String address, String city) {
        this.oldEmail = oldEmail;
        this.email = email;
        this.name = name;
        this.address = address;
        this.city = city;
    }
}
