package me.cryptforge.mindset.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import me.cryptforge.mindset.model.Course;
import me.cryptforge.mindset.model.Evaluation;
import me.cryptforge.mindset.model.Recommendation;
import me.cryptforge.mindset.model.Skill;

import java.util.List;

@Getter
@Setter
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
