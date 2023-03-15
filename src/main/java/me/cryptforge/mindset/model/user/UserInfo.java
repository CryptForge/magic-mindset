package me.cryptforge.mindset.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import me.cryptforge.mindset.model.Evaluation;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "user_info")
public class UserInfo {

    @Id
    private Long id;

    @OneToOne
    @JoinColumn(name = "id")
    @PrimaryKeyJoinColumn
    private User user;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "city", nullable = false)
    private String city;

    @OneToMany(mappedBy = "evaluator")
    private List<Evaluation> evaluations;

    public UserInfo(User user, String name, String address, String city) {
        this.user = user;
        this.name = name;
        this.address = address;
        this.city = city;
    }

    public UserInfo(User user, String name, String address, String city, List<Evaluation> evaluations) {
        this.user = user;
        this.name = name;
        this.address = address;
        this.city = city;
        this.evaluations = evaluations;
    }
}