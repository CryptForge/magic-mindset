package me.cryptforge.mindset.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.cryptforge.mindset.model.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "trainee")
public class Trainee {

    @Id
    private Long id;

    @MapsId
    @OneToOne(optional = false)
    @JoinColumn(name = "id")
    private UserInfo user;

    @ManyToOne
    @JoinColumn(name = "coach_id")
    private Coach coach;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private Manager manager;

    @OneToMany(mappedBy = "trainee")
    private List<Skill> skills = new ArrayList<>();

    @OneToMany(mappedBy = "trainee")
    private List<Course> courses = new ArrayList<>();

    @OneToMany(mappedBy = "trainee")
    private List<Recommendation> recommendations = new ArrayList<>();

    @OneToMany(mappedBy = "trainee")
    private List<Evaluation> evaluations = new ArrayList<>();

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
