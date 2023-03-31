package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.evaluation.EditEvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationResponse;
import me.cryptforge.mindset.model.File;
import me.cryptforge.mindset.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;

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
        return evaluationService.getAllByEvaluator(id);
    }

    @GetMapping("/all/trainee/{id}")
    public Iterable<EvaluationResponse> getAllEvaluationsTrainee(@PathVariable Long id) {
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

    @PostMapping("/edit/conclusion")
    public void editConclusionFile(@RequestParam("id") Long id,
                                   @RequestParam("file") MultipartFile file) {
        evaluationService.addConclusion(id, file);
    }

    @GetMapping(value = "/get/conclusion/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getCertification(@PathVariable Long id) {
        File file = evaluationService.getConclusion(id);
        try {
            return file.getFile().getBinaryStream().readAllBytes();
        } catch (IOException | SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
