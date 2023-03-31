package me.cryptforge.mindset.service;

import jakarta.mail.MessagingException;
import me.cryptforge.mindset.dto.user.UserChangeInfo;

public interface MailService {

    void sendVerificationMail(String to) throws MessagingException;

    void sendEvaluationMailQuestion(String to, String asker, String dateTime, String location) throws MessagingException;

    void sendEvaluationMailAccepted(String to, String acceptor, String dateTime, String location) throws MessagingException;

    void sendEvaluationMailDenied(String to, String denier, String reason) throws MessagingException;

    void sendEvaluationMailValuesChanged(String to, String changer, String dateTime, String location) throws MessagingException;

    void sendRecommendationMail(String to, String usernameFrom, String recommendation) throws MessagingException;

    void sendRequestDenied(String to, String reason) throws MessagingException;

    void sendRequestAccepted(String to, UserChangeInfo oldUser, UserChangeInfo newUser) throws MessagingException;
}
