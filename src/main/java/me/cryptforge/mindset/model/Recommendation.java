package me.cryptforge.mindset.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "recommendation")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_recipient_id")
    private UserInfo recipient;

    @ManyToOne
    @JoinColumn(name = "user_recommender_id")
    private UserInfo recommender;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "message", nullable = false)
    private String message;

}