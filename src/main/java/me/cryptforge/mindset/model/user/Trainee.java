package me.cryptforge.mindset.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.cryptforge.mindset.model.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "trainee")
public class Trainee {

    @Id
    private Long id;

    @OneToOne
    @JoinColumn(name = "id")
    @PrimaryKeyJoinColumn
    private UserInfo user;

    @ManyToOne
    @JoinColumn(name = "coach_id")
    private Coach coach;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private Manager manager;

    @OneToMany(mappedBy = "trainee")
    private List<Skill> skills;

    @OneToMany(mappedBy = "trainee")
    private List<Course> courses;

    @OneToMany(mappedBy = "trainee")
    private List<EvaluationInvitation> invitations;

    @OneToMany(mappedBy = "trainee")
    private List<Recommendation> recommendations;

    @OneToMany(mappedBy = "trainee")
    private List<Evaluation> evaluations;

    public Trainee(UserInfo user) {
        this.user = user;
    }

    public Trainee(UserInfo user, Coach coach, Manager manager, List<Skill> skills, List<Course> courses, List<Recommendation> recommendations, List<Evaluation> evaluations) {
        this.user = user;
        this.coach = coach;
        this.manager = manager;
        this.skills = skills;
        this.courses = courses;
        this.recommendations = recommendations;
        this.evaluations = evaluations;
    }
}
