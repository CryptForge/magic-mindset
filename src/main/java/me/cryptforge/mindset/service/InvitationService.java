package me.cryptforge.mindset.service;


import me.cryptforge.mindset.dto.invitation.InvitationResponse;

import java.util.Optional;

public interface InvitationService {

    Optional<InvitationResponse> getInvitation(Long id);

    Iterable<InvitationResponse> getByTrainee(Long traineeId);

    Iterable<InvitationResponse> getByEvaluation(Long evaluationId);

}
