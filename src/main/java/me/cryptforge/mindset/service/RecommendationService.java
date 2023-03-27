package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.recommendation.RecommendationRequest;
import me.cryptforge.mindset.dto.recommendation.RecommendationResponse;

import java.util.Optional;

public interface RecommendationService {

    /**
     * Get a specific recommendation
     *
     * @param id The recommendation id
     * @return The recommendation
     */
    Optional<RecommendationResponse> getRecommendation(Long id);

    /**
     * Get all recommendations in the database
     *
     * @return All recommendations or none
     */
    Iterable<RecommendationResponse> getAllRecommendations();

    /**
     * Get all recommendations of a specific user
     *
     * @param id The userId
     * @return All recommendations of that user or none
     */
    Iterable<RecommendationResponse> getAllByUser(Long id);

    /**
     * Create a recommendation
     *
     * @param recommendationRequest The request with all the values
     * @return The created recommendation
     */
    RecommendationResponse createRecommendation(RecommendationRequest recommendationRequest);
}
