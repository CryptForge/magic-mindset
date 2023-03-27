package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.recommendation.RecommendationRequest;
import me.cryptforge.mindset.dto.recommendation.RecommendationResponse;
import me.cryptforge.mindset.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/recommendation")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/{id}")
    private ResponseEntity<RecommendationResponse> getRecommendation(@PathVariable Long id) {
        return ResponseEntity.of(recommendationService.getRecommendation(id));
    }

    @GetMapping("/all")
    private Iterable<RecommendationResponse> getAllRecommendations() {
        return recommendationService.getAllRecommendations();
    }

    @GetMapping("/all/user/{id}")
    private Iterable<RecommendationResponse> getAllByUser(@PathVariable Long id) {
        return recommendationService.getAllByUser(id);
    }

    @PostMapping("/create")
    private RecommendationResponse createRecommendation(@RequestBody RecommendationRequest recommendationRequest) {
        return recommendationService.createRecommendation(recommendationRequest);
    }
}
