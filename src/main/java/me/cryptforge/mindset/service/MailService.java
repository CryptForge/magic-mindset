package me.cryptforge.mindset.service;

import jakarta.mail.MessagingException;
import me.cryptforge.mindset.model.user.UserInfo;

public interface MailService {

    void sendVerificationMail(String to) throws MessagingException;

    void sendEvaluationMail(String to, String username, String dateTime, String location) throws MessagingException;

    void sendRequestDenied(String to, String reason) throws MessagingException;

    void sendRequestAccepted(String to, String reason, UserInfo oldUser, UserInfo newUser) throws MessagingException;
}
