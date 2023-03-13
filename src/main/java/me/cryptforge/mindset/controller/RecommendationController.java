package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.recommendation.RecommendationRequest;
import me.cryptforge.mindset.service.RecommendationService;
import me.cryptforge.mindset.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/recommendation")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/get/all")
    private ResponseEntity<?> getAllRecommendations() {
        return recommendationService.getAllRecommendations();
    }

    @GetMapping("/get/all/user/{id}")
    private ResponseEntity<?> getAllRecommendationsSpecificUser(@PathVariable String id) {
        return recommendationService.getAllRecommendationsSpecificUser(id);
    }

    @GetMapping("/get/{id}")
    private ResponseEntity<?> getSpecificRecommendation(@PathVariable String id) {
        return recommendationService.getSpecificRecommendation(id);
    }

    @PostMapping("/create")
    private ResponseEntity<?> createRecommendation(@RequestBody RecommendationRequest recommendationRequest) {
        return recommendationService.createRecommendation(recommendationRequest);
    }
}
