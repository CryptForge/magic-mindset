package me.cryptforge.mindset.service;

import jakarta.transaction.Transactional;
import me.cryptforge.mindset.dto.report.SkillReportRequest;
import me.cryptforge.mindset.dto.report.SkillReportResponse;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.Evaluation;
import me.cryptforge.mindset.model.Report;
import me.cryptforge.mindset.model.Skill;
import me.cryptforge.mindset.model.SkillReport;
import me.cryptforge.mindset.repository.EvaluationRepository;
import me.cryptforge.mindset.repository.ReportRepository;
import me.cryptforge.mindset.repository.SkillReportRepository;
import me.cryptforge.mindset.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import java.util.stream.StreamSupport;

@Service
@Transactional
public class SkillReportServiceImpl implements SkillReportService {

    @Autowired
    SkillReportRepository repository;

    @Autowired
    SkillRepository skillRepository;
    @Autowired
    private EvaluationRepository evaluationRepository;
    @Autowired
    private ReportRepository reportRepository;

    @Override
    public Optional<SkillReportResponse> getSkillReport(Long id) {
        return repository.findById(id)
                .map(SkillReportResponse::fromSkillReport);
    }

    @Override
    public Iterable<SkillReportResponse> getAllBySkill(Long id) {
        final Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("skill"));

        return StreamSupport.stream(repository.findAllBySkill(skill).spliterator(), false)
                .map(SkillReportResponse::fromSkillReport)
                .toList();
    }

    @Override
    public Iterable<SkillReportResponse> getAllByEvaluation(Long id) {
        final Evaluation evaluation = evaluationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("evaluation"));

        return StreamSupport.stream(repository.findAllByReport_Evaluation(evaluation).spliterator(), false)
                .map(SkillReportResponse::fromSkillReport)
                .toList();
    }

    @Override
    public void createSkillReport(SkillReportRequest request) {
        final Skill skill = skillRepository.findById(request.skillId())
                .orElseThrow(() -> new EntityNotFoundException("skill"));

        final Evaluation evaluation = evaluationRepository.findById(request.evaluationId())
                .orElseThrow(() -> new EntityNotFoundException("evaluation"));

        Optional<Report> optionalReport = reportRepository.findByEvaluation(evaluation);

        if (optionalReport.isPresent()) {
            final SkillReport skillReport = new SkillReport(
                    optionalReport.get(),
                    skill,
                    request.progress(),
                    request.date()
            );
            repository.save(skillReport);
        } else {
            final Report report = new Report(evaluation, Date.from(Instant.now()));
            final Report savedReport = reportRepository.save(report);
            final SkillReport skillReport = new SkillReport(
                    savedReport,
                    skill,
                    request.progress(),
                    request.date()
            );
            repository.save(skillReport);
        }
    }
}
