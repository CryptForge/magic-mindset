package me.cryptforge.mindset.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.cryptforge.mindset.model.user.Trainee;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "evaluation_invitation")
public class EvaluationInvitation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "trainee_id")
    private Trainee trainee;

    @ManyToOne
    @JoinColumn(name = "evaluation_id")
    private Evaluation evaluation;

    @Column(name = "reminder_date")
    private Date reminder;

    @Column(name = "reminder_sent")
    private boolean reminderSent;

    @Column(name = "answered")
    private boolean answered;

    public EvaluationInvitation(Trainee trainee, Evaluation evaluation, Date reminder) {
        this.trainee = trainee;
        this.evaluation = evaluation;
        this.reminder = reminder;
    }
}