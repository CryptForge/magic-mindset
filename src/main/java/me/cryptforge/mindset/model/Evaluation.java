package me.cryptforge.mindset.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.model.user.UserInfo;

import java.util.Date;

@Getter
@Setter
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

    @Column(name = "conclusion")
    private String conclusion;

    @ManyToOne
    @JoinColumn(name = "evaluator_id")
    private UserInfo evaluator;

    @ManyToOne
    @JoinColumn(name = "trainee_id")
    private Trainee trainee;

}