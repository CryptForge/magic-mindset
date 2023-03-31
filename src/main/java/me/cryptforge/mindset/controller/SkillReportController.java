package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.report.SkillReportRequest;
import me.cryptforge.mindset.dto.report.SkillReportResponse;
import me.cryptforge.mindset.service.SkillReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/report")
public class SkillReportController {

    @Autowired
    SkillReportService service;

    @GetMapping("/{id}")
    public ResponseEntity<SkillReportResponse> getSkillReport(@PathVariable Long id) {
        return ResponseEntity.of(service.getSkillReport(id));
    }

    @GetMapping("/all/skill/{id}")
    public Iterable<SkillReportResponse> getAllBySkill(@PathVariable Long id) {
        return service.getAllBySkill(id);
    }

    @GetMapping("/all/evaluation/{id}")
    public Iterable<SkillReportResponse> getAllByEvaluation(@PathVariable Long id) {
        return service.getAllByEvaluation(id);
    }

    @PostMapping
    public ResponseEntity<String> createSkillReport(@RequestBody SkillReportRequest request) {
        service.createSkillReport(request);
        return ResponseEntity.ok("Skill report created");
    }

}
