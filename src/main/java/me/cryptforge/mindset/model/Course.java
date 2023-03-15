package me.cryptforge.mindset.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import me.cryptforge.mindset.model.user.Trainee;

@Getter
@Setter
@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "skill_id")
    private Skill skill;

    @Column(name = "progress", nullable = false)
    private float progress;

    @Column(name = "certification")
    private String certification;

    @ManyToOne
    @JoinColumn(name = "trainee_id")
    private Trainee trainee;

    public Course(Skill skill, float progress, String certification, Trainee trainee) {
        this.skill = skill;
        this.progress = progress;
        this.certification = certification;
        this.trainee = trainee;
    }

}