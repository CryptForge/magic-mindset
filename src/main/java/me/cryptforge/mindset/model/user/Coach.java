package me.cryptforge.mindset.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "coach")
public class Coach {

    @Id
    @OneToOne
    @JoinColumn(name = "id")
    private UserInfo user;

    @OneToMany(mappedBy = "coach")
    private List<Trainee> trainees;

}
