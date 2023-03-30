package me.cryptforge.mindset.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.cryptforge.mindset.model.Evaluation;
import me.cryptforge.mindset.model.EvaluationInvitation;

import java.sql.Blob;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user_info")
public class UserInfo {

    @Id
    private Long id;

    @MapsId
    @OneToOne(optional = false)
    @JoinColumn(name = "id")
    private User user;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "city", nullable = false)
    private String city;

    @Lob
    @Column(name = "image")
    private Blob image;

    @OneToMany(mappedBy = "evaluator")
    private List<Evaluation> evaluations;

    @OneToMany(mappedBy = "user")
    private List<EvaluationInvitation> invitations;

    public UserInfo(User user, String name, String address, String city) {
        this.user = user;
        this.name = name;
        this.address = address;
        this.city = city;
    }

    public UserInfo(User user, String name, String address, String city, Blob image, List<Evaluation> evaluations) {
        this.user = user;
        this.name = name;
        this.address = address;
        this.city = city;
        this.evaluations = evaluations;
        this.image = image;
    }
}