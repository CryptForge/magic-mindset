package me.cryptforge.mindset.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "skill_report")
public class SkillReport {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "evaluation_id")
    private Evaluation evaluation;

    @ManyToOne
    @JoinColumn(name = "skill_id")
    private Skill skill;

    @Column(name = "progress", nullable = false)
    private String progress;

    @Column(name = "date", nullable = false)
    private Date date;

    public SkillReport(Evaluation evaluation, Skill skill, String progress, Date date) {
        this.evaluation = evaluation;
        this.skill = skill;
        this.progress = progress;
        this.date = date;
    }

}