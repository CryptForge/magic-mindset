package me.cryptforge.mindset.service;

import jakarta.mail.MessagingException;
import me.cryptforge.mindset.dto.recommendation.RecommendationRequest;
import me.cryptforge.mindset.dto.recommendation.RecommendationResponse;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.Recommendation;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.model.user.UserInfo;
import me.cryptforge.mindset.repository.RecommendationRepository;
import me.cryptforge.mindset.repository.TraineeRepository;
import me.cryptforge.mindset.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.StreamSupport;

@Service
public class RecommendationServiceImpl implements RecommendationService {

    @Autowired
    private RecommendationRepository recommendationRepository;

    @Autowired
    private TraineeRepository traineeRepository;

    @Autowired
    private MailService mailService;
    @Autowired
    private UserInfoRepository userInfoRepository;

    @Override
    public Optional<RecommendationResponse> getRecommendation(Long id) {
        return recommendationRepository.findById(id).map(RecommendationResponse::fromRecommendation);
    }

    @Override
    public Iterable<RecommendationResponse> getAllRecommendations() {
        return StreamSupport.stream(recommendationRepository.findAll().spliterator(), false)
                .map(RecommendationResponse::fromRecommendation)
                .toList();
    }

    @Override
    public Iterable<RecommendationResponse> getAllByUser(Long id) {
        final Trainee trainee = traineeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("trainee"));

        return StreamSupport.stream(recommendationRepository.findAllByTrainee(trainee).spliterator(), false)
                .map(RecommendationResponse::fromRecommendation)
                .toList();
    }


    @Override
    public RecommendationResponse createRecommendation(RecommendationRequest request) {
        final Trainee trainee = traineeRepository.findById(request.traineeId())
                .orElseThrow(() -> new EntityNotFoundException("trainee"));
        final UserInfo userInfo = userInfoRepository.findById(request.userId())
                .orElseThrow(() -> new EntityNotFoundException("user"));

        final Recommendation recommendation = new Recommendation(
                request.date(),
                request.message(),
                trainee
        );

        try {
            mailService.sendRecommendationMail(trainee.getUser().getUser().getEmail(), userInfo.getName(), request.message());
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        return RecommendationResponse.fromRecommendation(recommendationRepository.save(recommendation));
    }

}
