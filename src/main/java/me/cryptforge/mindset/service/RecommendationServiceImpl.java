package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.course.CourseResponseWithoutTrainee;
import me.cryptforge.mindset.dto.recommendation.RecommendationRequest;
import me.cryptforge.mindset.model.Course;
import me.cryptforge.mindset.model.Recommendation;
import me.cryptforge.mindset.model.Skill;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.repository.RecommendationRepository;
import me.cryptforge.mindset.repository.TraineeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RecommendationServiceImpl implements RecommendationService {
    private final RecommendationRepository recommendationRepository;
    private final TraineeRepository traineeRepository;

    public RecommendationServiceImpl(RecommendationRepository recommendationRepository,
                                     TraineeRepository traineeRepository) {
        this.recommendationRepository = recommendationRepository;
        this.traineeRepository = traineeRepository;
    }


    @Override
    public ResponseEntity<?> getAllRecommendations() {
        List<Recommendation> allRecommendations = new ArrayList<>();
        recommendationRepository.findAll().iterator().forEachRemaining(allRecommendations::add);
        return ResponseEntity.ok(allRecommendations);
    }

    @Override
    public ResponseEntity<?> getAllRecommendationsSpecificUser(String id) {
        List<Recommendation> allRecommendations = new ArrayList<>();
        recommendationRepository.findAllByTrainee_User_User_Id(Long.valueOf(id)).iterator().forEachRemaining(allRecommendations::add);
        return ResponseEntity.ok(allRecommendations);
    }

    @Override
    public ResponseEntity<?> getSpecificRecommendation(String id) {
        Optional<Recommendation> singleRecommendation = recommendationRepository.findById(Long.valueOf(id));
        if (singleRecommendation.isPresent()) {
            return ResponseEntity.ok(singleRecommendation.get());
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<?> createRecommendation(RecommendationRequest recommendationRequest) {
        Optional<Trainee> optionalTrainee = traineeRepository.findByUser_User_Id(recommendationRequest.traineeId());

        if (optionalTrainee.isEmpty()) {
            return returnBadRequest("trainee");
        }

        Recommendation recommendation = new Recommendation(recommendationRequest.date(), recommendationRequest.message(),
                optionalTrainee.get());
        Recommendation savedRecommendation = recommendationRepository.save(recommendation);
        return ResponseEntity.ok(savedRecommendation);
    }
    private ResponseEntity<String> returnBadRequest(String type) {
        return ResponseEntity.badRequest().body("No " + type + " with that id could be found!");
    }

}
