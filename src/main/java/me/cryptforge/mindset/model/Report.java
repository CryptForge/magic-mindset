package me.cryptforge.mindset.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToOne
    @JoinColumn(name = "evaluation_id")
    private Evaluation evaluation;

    @OneToMany(mappedBy = "report")
    private List<SkillReport> skillReports;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "content", nullable = false)
    private String reportFileName;

    public Report(Evaluation evaluation, Date date, String reportFileName) {
        this.evaluation = evaluation;
        this.date = date;
        this.reportFileName = reportFileName;
    }
}