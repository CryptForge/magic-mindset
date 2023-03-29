package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.evaluation.EditEvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationRequest;
import me.cryptforge.mindset.model.Evaluation;
import me.cryptforge.mindset.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/evaluation")
public class EvaluationController {

    @Autowired
    private EvaluationService evaluationService;

    @GetMapping("/get/all")
    public Iterable<Evaluation> getAllEvaluations() {
        return evaluationService.getAllEvaluations();
    }

    @GetMapping("/get/single/{id}")
    public ResponseEntity<Evaluation> getSingleEvaluation(@PathVariable Long id) {
        return ResponseEntity.of(evaluationService.getSingleEvaluation(id));
    }

    @GetMapping("/get/all/user/{id}")
    public Iterable<Evaluation> getAllEvaluationsUser(@PathVariable Long id) {
        return evaluationService.getAllEvaluationsUser(id);
    }

    @PostMapping
    public Evaluation createEvaluation(@RequestBody EvaluationRequest evaluationRequest) {
        return evaluationService.createEvaluation(evaluationRequest);
    }

    @PutMapping("/edit")
    public Evaluation editEvaluation(@RequestBody EditEvaluationRequest editEvaluationRequest) {
        return evaluationService.editEvaluation(editEvaluationRequest);
    }
}
