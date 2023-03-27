package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.mail.MailDenyRequest;
import me.cryptforge.mindset.dto.user.UserChangeInfoResponse;
import me.cryptforge.mindset.model.PendingEdit;

import java.util.List;

public interface PendingEditService {

    List<UserChangeInfoResponse> pendingEdits();

    void acceptChange(Long id);

    void denyChange(Long id, MailDenyRequest mailDenyRequest);

}
