package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.evaluation.EditEvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationRequest;
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
    public ResponseEntity<?> getAllEvaluations() {
        return evaluationService.getAllEvaluations();
    }

    @GetMapping("/get/single/{id}")
    public ResponseEntity<?> getSingleEvaluation(@PathVariable String id) {
        return evaluationService.getSingleEvaluation(id);
    }

    @GetMapping("/get/all/user/{id}")
    public ResponseEntity<?> getAllEvaluationsUser(@PathVariable String id) {
        return evaluationService.getAllEvaluationsUser(id);
    }

    @PostMapping
    public ResponseEntity<?> createEvaluation(@RequestBody EvaluationRequest evaluationRequest) {
        return evaluationService.createEvaluation(evaluationRequest);
    }

    @GetMapping("/edit")
    public ResponseEntity<?> editEvaluation(@RequestBody EditEvaluationRequest editEvaluationRequest) {
        return evaluationService.editEvaluation(editEvaluationRequest);
    }
}
