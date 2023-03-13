package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.recommendation.RecommendationRequest;
import org.springframework.http.ResponseEntity;

public interface RecommendationService {

    /**
     * Get all recommendations in the database
     *
     * @return - Return all recommendations or none
     */
    ResponseEntity<?> getAllRecommendations();

    /**
     * Get all recommendations of a specific user
     *
     * @param id - The userId
     * @return - Return all recommendations of that user or none
     */
    ResponseEntity<?> getAllRecommendationsSpecificUser(String id);

    /**
     * Get a specific recommendation
     *
     * @param id - The recommendation id
     * @return - Return the recommendation or bad request
     */
    ResponseEntity<?> getSpecificRecommendation(String id);

    /**
     * Create a recommendation
     *
     * @param recommendationRequest - The request with all the values
     * @return - Returns the recommendation or bad request
     */
    ResponseEntity<?> createRecommendation(RecommendationRequest recommendationRequest);
}
