package me.cryptforge.mindset.dto.invitation;

import me.cryptforge.mindset.model.EvaluationInvitation;

import java.util.Date;

public record InvitationResponse(
        Long id,
        Long trainee,
        Date reminder,
        boolean answered
) {

    public static InvitationResponse fromInvitation(EvaluationInvitation invitation) {
        return new InvitationResponse(
                invitation.getId(),
                invitation.getUser().getId(),
                invitation.getReminder(),
                invitation.isAnswered()
        );
    }

}
