package me.cryptforge.mindset.service;

import jakarta.transaction.Transactional;
import me.cryptforge.mindset.dto.report.SkillReportRequest;
import me.cryptforge.mindset.dto.report.SkillReportResponse;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.Skill;
import me.cryptforge.mindset.model.SkillReport;
import me.cryptforge.mindset.repository.SkillReportRepository;
import me.cryptforge.mindset.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.StreamSupport;

@Service
@Transactional
public class SkillReportServiceImpl implements SkillReportService {

    @Autowired
    SkillReportRepository repository;

    @Autowired
    SkillRepository skillRepository;

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
    public void createSkillReport(SkillReportRequest request) {
        final Skill skill = skillRepository.findById(request.skillId())
                .orElseThrow(() -> new EntityNotFoundException("skill"));

        final SkillReport report = new SkillReport(
                null,
                skill,
                request.progress(),
                request.date()
        );

        repository.save(report);
    }
}
