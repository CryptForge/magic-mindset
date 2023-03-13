package me.cryptforge.mindset.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import me.cryptforge.mindset.model.user.Trainee;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "skill")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "type", nullable = false)
    private boolean type;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "skill")
    private List<Course> courses;

    @ManyToOne
    @JoinColumn(name = "trainee_id")
    private Trainee trainee;

    public Skill(boolean type, String name, String description, List<Course> courses, Trainee trainee) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.courses = courses;
        this.trainee = trainee;
    }
}