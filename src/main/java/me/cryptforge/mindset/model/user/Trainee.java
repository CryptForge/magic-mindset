package me.cryptforge.mindset.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "trainee")
public class Trainee {

    @Id
    @OneToOne
    @JoinColumn(name = "id")
    private UserInfo user;

    @ManyToOne
    @JoinColumn(name = "coach_id")
    private Coach coach;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private Manager manager;

}
