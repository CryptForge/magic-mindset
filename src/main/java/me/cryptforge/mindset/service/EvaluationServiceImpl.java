package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.evaluation.EditEvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationResponse;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.Evaluation;
import me.cryptforge.mindset.model.EvaluationInvitation;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.model.user.UserInfo;
import me.cryptforge.mindset.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.stream.StreamSupport;

@Service
public class EvaluationServiceImpl implements EvaluationService {

    @Autowired
    private EvaluationRepository evaluationRepository;
    @Autowired
    private InvitationRepository invitationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private TraineeRepository traineeRepository;

    @Override
    public Optional<EvaluationResponse> getSingleEvaluation(Long id) {
        return evaluationRepository.findById(id)
                .map(EvaluationResponse::fromEvaluation);
    }

    @Override
    public Iterable<EvaluationResponse> getAllEvaluations() {
        return StreamSupport.stream(evaluationRepository.findAll().spliterator(), false)
                .map(EvaluationResponse::fromEvaluation)
                .toList();
    }

    @Override
    public Iterable<EvaluationResponse> getAllByTrainee(Long id) {
        final Trainee trainee = traineeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(("trainee")));

        return StreamSupport.stream(evaluationRepository.findAllByTrainee(trainee).spliterator(), false)
                .map(EvaluationResponse::fromEvaluation)
                .toList();
    }

    @Override
    public EvaluationResponse editEvaluation(EditEvaluationRequest request) throws EntityNotFoundException {
        final User user = userRepository.findById(request.traineeId())
                .orElseThrow(() -> new EntityNotFoundException("user"));
        final UserInfo userInfo = userInfoRepository.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("userInfo"));
        final Trainee trainee = traineeRepository.findByUser(userInfo)
                .orElseThrow(() -> new EntityNotFoundException("trainee"));
        final User evaluatorUser = userRepository.findById(request.evaluatorId())
                .orElseThrow(() -> new EntityNotFoundException("evaluator user"));
        final UserInfo evaluator = userInfoRepository.findByUser(evaluatorUser)
                .orElseThrow(() -> new EntityNotFoundException("evaluator userInfo"));
        final Evaluation evaluation = evaluationRepository.findById(request.id())
                .orElseThrow(() -> new EntityNotFoundException("evaluation"));

        evaluation.setDate(request.date());
        evaluation.setLocation(request.location());
        evaluation.setConclusion(request.conclusion());
        evaluation.setEvaluator(evaluator);
        evaluation.setTrainee(trainee);

        return EvaluationResponse.fromEvaluation(evaluationRepository.save(evaluation));
    }

    @Override
    public EvaluationResponse createEvaluation(EvaluationRequest request) throws EntityNotFoundException {
        final User user = userRepository.findById(request.traineeId())
                .orElseThrow(() -> new EntityNotFoundException("user"));
        final UserInfo userInfo = userInfoRepository.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("userInfo"));
        final Trainee trainee = traineeRepository.findByUser(userInfo)
                .orElseThrow(() -> new EntityNotFoundException("trainee"));
        final User evaluatorUser = userRepository.findById(request.evaluatorId())
                .orElseThrow(() -> new EntityNotFoundException("evaluator user"));
        final UserInfo evaluator = userInfoRepository.findByUser(evaluatorUser)
                .orElseThrow(() -> new EntityNotFoundException("evaluator userInfo"));


        final Evaluation evaluation = evaluationRepository.save(new Evaluation(
                request.date(),
                request.location(),
                evaluator,
                trainee
        ));

        final long currentTime = System.currentTimeMillis();
        final long timeDifference = currentTime - request.date().getTime();
        final Date reminderDate = new Date(currentTime + timeDifference / 2);
        final EvaluationInvitation invitation = new EvaluationInvitation(
                trainee,
                evaluation,
                reminderDate
        );
        invitationRepository.save(invitation);

        return EvaluationResponse.fromEvaluation(evaluation);
    }
}
