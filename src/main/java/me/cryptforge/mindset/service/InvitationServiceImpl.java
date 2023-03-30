package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.invitation.InvitationResponse;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.Evaluation;
import me.cryptforge.mindset.model.user.UserInfo;
import me.cryptforge.mindset.repository.EvaluationRepository;
import me.cryptforge.mindset.repository.InvitationRepository;
import me.cryptforge.mindset.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.StreamSupport;

@Service
public class InvitationServiceImpl implements InvitationService {

    @Autowired
    InvitationRepository invitationRepository;

    @Autowired
    EvaluationRepository evaluationRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Override
    public Optional<InvitationResponse> getInvitation(Long id) {
        return invitationRepository.findById(id).map(InvitationResponse::fromInvitation);
    }

    @Override
    public Iterable<InvitationResponse> getByUser(Long userId) {
        final UserInfo trainee = userInfoRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("user"));

        return StreamSupport.stream(invitationRepository.findAllByUser(trainee).spliterator(), false)
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
