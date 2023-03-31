package me.cryptforge.mindset.service;

import jakarta.mail.MessagingException;
import me.cryptforge.mindset.dto.invitation.InvitationDenyRequest;
import me.cryptforge.mindset.dto.invitation.InvitationResponse;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.Evaluation;
import me.cryptforge.mindset.model.EvaluationInvitation;
import me.cryptforge.mindset.model.user.UserInfo;
import me.cryptforge.mindset.repository.EvaluationRepository;
import me.cryptforge.mindset.repository.InvitationRepository;
import me.cryptforge.mindset.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
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

    @Autowired
    private MailService mailService;

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

    @Override
    public void denyInvitation(InvitationDenyRequest invitationDenyRequest) {
        final EvaluationInvitation evaluationInvitation = invitationRepository.findById(invitationDenyRequest.id())
                .orElseThrow(() -> new EntityNotFoundException("evaluation invitation"));

        final UserInfo userToSendTo = Objects.equals(evaluationInvitation.getUser().getId(),
                evaluationInvitation.getEvaluation().getTrainee().getUser().getId()) ?
                evaluationInvitation.getEvaluation().getTrainee().getUser() :
                evaluationInvitation.getEvaluation().getEvaluator();

        try {
            mailService.sendEvaluationMailDenied(userToSendTo.getUser().getEmail(), evaluationInvitation.getUser().getName(), invitationDenyRequest.reason());
            invitationRepository.delete(evaluationInvitation);
            evaluationRepository.delete(evaluationInvitation.getEvaluation());
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void acceptInvitation(Long id) {
        final EvaluationInvitation evaluationInvitation = invitationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("evaluation invitation"));

        final UserInfo userToSendTo = Objects.equals(evaluationInvitation.getUser().getId(),
                evaluationInvitation.getEvaluation().getTrainee().getUser().getId()) ?
                evaluationInvitation.getEvaluation().getTrainee().getUser() :
                evaluationInvitation.getEvaluation().getEvaluator();
        try {
            mailService.sendEvaluationMailAccepted(userToSendTo.getUser().getEmail(),
                    evaluationInvitation.getUser().getName(),
                    String.valueOf(evaluationInvitation.getEvaluation().getDate()),
                    evaluationInvitation.getEvaluation().getLocation());
            invitationRepository.delete(evaluationInvitation);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
