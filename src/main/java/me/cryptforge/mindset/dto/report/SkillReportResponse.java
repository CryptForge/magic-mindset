package me.cryptforge.mindset.dto.report;

import me.cryptforge.mindset.model.SkillReport;

import java.util.Date;

public record SkillReportResponse(
        Long id,
        Long skillId,
        Date date,
        String progress
) {

    public static SkillReportResponse fromSkillReport(SkillReport report) {
        return new SkillReportResponse(
                report.getId(),
                report.getSkill().getId(),
                report.getDate(),
                report.getProgress()
        );
    }

}
