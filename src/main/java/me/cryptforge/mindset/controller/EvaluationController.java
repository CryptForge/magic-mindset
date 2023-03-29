package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.evaluation.EditEvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationResponse;
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

    @GetMapping("/all")
    public Iterable<EvaluationResponse> getAllEvaluations() {
        return evaluationService.getAllEvaluations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EvaluationResponse> getSingleEvaluation(@PathVariable Long id) {
        return ResponseEntity.of(evaluationService.getSingleEvaluation(id));
    }

    @GetMapping("/all/user/{id}")
    public Iterable<EvaluationResponse> getAllEvaluationsUser(@PathVariable Long id) {
        return evaluationService.getAllByTrainee(id);
    }

    @PostMapping
    public EvaluationResponse createEvaluation(@RequestBody EvaluationRequest evaluationRequest) {
        return evaluationService.createEvaluation(evaluationRequest);
    }

    @PutMapping("/edit")
    public EvaluationResponse editEvaluation(@RequestBody EditEvaluationRequest editEvaluationRequest) {
        return evaluationService.editEvaluation(editEvaluationRequest);
    }
}
