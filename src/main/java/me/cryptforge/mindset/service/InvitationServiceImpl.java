package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.invitation.InvitationResponse;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.Evaluation;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.repository.EvaluationRepository;
import me.cryptforge.mindset.repository.InvitationRepository;
import me.cryptforge.mindset.repository.TraineeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.StreamSupport;

@Service
public class InvitationServiceImpl implements InvitationService {

    @Autowired
    InvitationRepository invitationRepository;

    @Autowired
    TraineeRepository traineeRepository;

    @Autowired
    EvaluationRepository evaluationRepository;

    @Override
    public Optional<InvitationResponse> getInvitation(Long id) {
        return invitationRepository.findById(id).map(InvitationResponse::fromInvitation);
    }

    @Override
    public Iterable<InvitationResponse> getByTrainee(Long traineeId) {
        final Trainee trainee = traineeRepository.findById(traineeId)
                .orElseThrow(() -> new EntityNotFoundException("trainee"));

        return StreamSupport.stream(invitationRepository.findAllByTrainee(trainee).spliterator(), false)
                .map(InvitationResponse::fromInvitation)
                .toList();
    }

    @Override
    public Iterable<InvitationResponse> getByEvaluation(Long evaluationId) {
        final Evaluation evaluation = evaluationRepository.findById(evaluationId)
                .orElseThrow(() -> new EntityNotFoundException("evaluation"));

        return StreamSupport.stream(invitationRepository.findAllByEvaluation(evaluation).spliterator(), false)
                .map(InvitationResponse::fromInvitation)
                .toList();
    }
}
