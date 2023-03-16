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
@Table(name = "manager")
public class Manager {

    @Id
    private Long id;

    @OneToOne
    @JoinColumn(name = "id")
    @PrimaryKeyJoinColumn
    private UserInfo user;

    @OneToMany(mappedBy = "manager")
    private List<Trainee> trainees;

    public Manager(UserInfo user) {
        this.user = user;
    }

    public Manager(UserInfo user, List<Trainee> trainees) {
        this.user = user;
        this.trainees = trainees;
    }
}
