package me.cryptforge.mindset.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.cryptforge.mindset.model.user.UserInfo;

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
    @JoinColumn(name = "user_id", nullable = false)
    private UserInfo user;

    @ManyToOne
    @JoinColumn(name = "evaluation_id", nullable = false)
    private Evaluation evaluation;

    @Column(name = "reminder_date", nullable = false)
    private Date reminder;

    @Column(name = "reminder_sent", nullable = false)
    private boolean reminderSent;

    public EvaluationInvitation(UserInfo user, Evaluation evaluation, Date reminder) {
        this.user = user;
        this.evaluation = evaluation;
        this.reminder = reminder;
    }
}