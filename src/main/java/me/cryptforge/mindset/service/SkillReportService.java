package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.report.SkillReportRequest;
import me.cryptforge.mindset.dto.report.SkillReportResponse;

import java.util.Optional;

public interface SkillReportService {

    Optional<SkillReportResponse> getSkillReport(Long id);

    void createSkillReport(SkillReportRequest request);

    Iterable<SkillReportResponse> getAllBySkill(Long id);

    Iterable<SkillReportResponse> getAllByEvaluation(Long id);
}
