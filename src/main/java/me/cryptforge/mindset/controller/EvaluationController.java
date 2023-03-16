package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.evaluation.EditEvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationRequest;
import me.cryptforge.mindset.exception.EntityNotFoundException;
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
    public ResponseEntity<?> createEvaluation(@RequestBody EvaluationRequest evaluationRequest) {
        try {
            return ResponseEntity.ok(evaluationService.createEvaluation(evaluationRequest));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editEvaluation(@RequestBody EditEvaluationRequest editEvaluationRequest) {
        try {
            return ResponseEntity.ok(evaluationService.editEvaluation(editEvaluationRequest));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
