package me.cryptforge.mindset.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "manager")
public class Manager {

    @Id
    @OneToOne
    @JoinColumn(name = "id")
    private UserInfo user;

    @OneToMany(mappedBy = "manager")
    private List<Trainee> trainees;

}
