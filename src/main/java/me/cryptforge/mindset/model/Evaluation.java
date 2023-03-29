package me.cryptforge.mindset.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.model.user.UserInfo;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "evaluation")
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "date")
    private Date date;

    @Column(name = "location")
    private String location;

    @Column(name = "conclusion_file_name")
    private String conclusionFileName;

    @ManyToOne
    @JoinColumn(name = "evaluator_id")
    private UserInfo evaluator;

    @ManyToOne
    @JoinColumn(name = "trainee_id")
    private Trainee trainee;

    @OneToOne(mappedBy = "evaluation")
    private Report report;

    @OneToMany(mappedBy = "evaluation")
    private List<EvaluationInvitation> invitations;

    public Evaluation(Date date, String location, String conclusionFileName, UserInfo evaluator, Trainee trainee) {
        this.date = date;
        this.location = location;
        this.conclusionFileName = conclusionFileName;
        this.evaluator = evaluator;
        this.trainee = trainee;
    }
}