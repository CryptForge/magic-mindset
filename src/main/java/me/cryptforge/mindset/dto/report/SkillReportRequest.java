package me.cryptforge.mindset.dto.report;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public record SkillReportRequest(
        Long skillId,
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        Date date,
        String progress
) {

}
