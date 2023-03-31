package me.cryptforge.mindset.service;

import jakarta.mail.MessagingException;
import me.cryptforge.mindset.dto.mail.MailDenyRequest;
import me.cryptforge.mindset.dto.user.UserChangeInfo;
import me.cryptforge.mindset.dto.user.UserChangeInfoResponse;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.PendingEdit;
import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.model.user.UserInfo;
import me.cryptforge.mindset.repository.PendingEditRepository;
import me.cryptforge.mindset.repository.UserInfoRepository;
import me.cryptforge.mindset.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class PendingEditServiceImpl implements PendingEditService {

    @Autowired
    private PendingEditRepository pendingEditRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private MailService mailService;

    @Override
    public List<UserChangeInfoResponse> pendingEdits() {
        List<UserChangeInfoResponse> allPendingEdits = new ArrayList<>();
        pendingEditRepository.findAll().iterator().forEachRemaining(pendingEdit -> {
            User user = userRepository.findByEmail(pendingEdit.getOldEmail()).orElseThrow(() -> new EntityNotFoundException("user"));
            UserInfo userInfo = userInfoRepository.findByUser(user).orElseThrow(() -> new EntityNotFoundException("userInfo"));
            UserChangeInfoResponse userChangeInfoResponse = new UserChangeInfoResponse(pendingEdit.getId(), pendingEdit.getName(), pendingEdit.getEmail(),
                    pendingEdit.getAddress(), pendingEdit.getCity(), userInfo.getName(), user.getEmail(), userInfo.getAddress(), userInfo.getCity());
            allPendingEdits.add(userChangeInfoResponse);
        });
        return allPendingEdits;
    }

    @Override
    public void acceptChange(Long id) {
        PendingEdit pendingEdit = pendingEditRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("pending request"));
        User user = userRepository.findByEmail(pendingEdit.getOldEmail()).orElseThrow(() -> new EntityNotFoundException("user"));
        UserInfo userInfo = userInfoRepository.findByUser(user).orElseThrow(() -> new EntityNotFoundException("userInfo"));
        try {
            mailService.sendRequestAccepted(pendingEdit.getEmail(), new UserChangeInfo(userInfo.getName(), user.getEmail(), userInfo.getAddress(), userInfo.getCity()),
                    new UserChangeInfo(pendingEdit.getName(), pendingEdit.getEmail(), pendingEdit.getAddress(), pendingEdit.getCity()));
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        if (!Objects.equals(user.getEmail(), pendingEdit.getEmail())) {
            user.setEmail(pendingEdit.getEmail());
            userRepository.save(user);
        }
        if (!Objects.equals(userInfo.getName(), pendingEdit.getName())) {
            userInfo.setName(pendingEdit.getName());
        }
        if (!Objects.equals(userInfo.getAddress(), pendingEdit.getAddress())) {
            userInfo.setAddress(pendingEdit.getAddress());
        }
        if (!Objects.equals(userInfo.getCity(), pendingEdit.getCity())) {
            userInfo.setCity(pendingEdit.getCity());
        }
        userInfoRepository.save(userInfo);
        pendingEditRepository.delete(pendingEdit);
    }

    @Override
    public void denyChange(Long id, MailDenyRequest mailDenyRequest) {
        PendingEdit pendingEdit = pendingEditRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("pending request"));
        try {
            mailService.sendRequestDenied(mailDenyRequest.to(), mailDenyRequest.reason());
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        pendingEditRepository.delete(pendingEdit);
    }
}
