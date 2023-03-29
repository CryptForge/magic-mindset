package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.evaluation.EditEvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationRequest;
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
    public Optional<Evaluation> getSingleEvaluation(Long id) {
        return evaluationRepository.findById(id);
    }

    @Override
    public Iterable<Evaluation> getAllEvaluations() {
        return evaluationRepository.findAll();
    }

    @Override
    public Iterable<Evaluation> getAllEvaluationsUser(Long id) {
        return evaluationRepository.findAllByTrainee_User_User_Id(id);
    }

    @Override
    public Evaluation editEvaluation(EditEvaluationRequest request) throws EntityNotFoundException {
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

        return evaluationRepository.save(evaluation);
    }

    @Override
    public Evaluation createEvaluation(EvaluationRequest request) throws EntityNotFoundException {
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
                request.conclusion(),
                evaluator,
                trainee
        ));

        final long timeDifference = System.currentTimeMillis() - request.date().getTime();
        final Date reminderDate = new Date(timeDifference);
        final EvaluationInvitation invitation = new EvaluationInvitation(
                trainee,
                evaluation,
                reminderDate
        );
        invitationRepository.save(invitation);

        return evaluation;
    }
}
