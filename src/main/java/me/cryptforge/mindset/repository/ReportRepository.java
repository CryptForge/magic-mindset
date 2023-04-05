package me.cryptforge.mindset.repository;

import me.cryptforge.mindset.model.Evaluation;
import me.cryptforge.mindset.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Long> {
    Optional<Report> findByEvaluation(Evaluation evaluation);
}