package me.cryptforge.mindset.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "coach")
public class Coach {

    @Id
    private Long id;

    @MapsId
    @OneToOne(optional = false)
    @JoinColumn(name = "id")
    private UserInfo user;

    @OneToMany(mappedBy = "coach")
    private List<Trainee> trainees;

    public Coach(UserInfo user) {
        this.user = user;
    }

    public Coach(UserInfo user, List<Trainee> trainees) {
        this.user = user;
        this.trainees = trainees;
    }
}
