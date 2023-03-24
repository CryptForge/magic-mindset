package me.cryptforge.mindset.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.cryptforge.mindset.model.user.Trainee;

import java.sql.Blob;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "skill_id")
    private Skill skill;

    @Column(name = "progress", nullable = false)
    private float progress;

    @Column(name = "certification")
    private String certificationFileName;

    @ManyToOne
    @JoinColumn(name = "trainee_id")
    private Trainee trainee;

    public Course(String name, Skill skill, float progress, String certificationFileName, Trainee trainee) {
        this.name = name;
        this.skill = skill;
        this.progress = progress;
        this.certificationFileName = certificationFileName;
        this.trainee = trainee;
    }

}