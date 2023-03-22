package me.cryptforge.mindset.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import me.cryptforge.mindset.model.user.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.Map;

@Service
public class MailServiceImpl implements MailService {

    @Value("${project.mail.noreplyemail}")
    private String NOREPLY_ADDRESS;
    @Value("${project.domain}")
    private String domain;
    @Autowired
    private JavaMailSender emailSender;
    @Autowired
    private SpringTemplateEngine thymeleafTemplateEngine;
    @Override
    public void sendVerificationMail(String to) throws MessagingException {
        Map<String, Object> templateModel = Map.of("to", to,
                "verificationLink", domain+"verify?email=" + to);

        String htmlBody = thymeleafTemplateEngine.process("mail/verification_mail.html", createContext(templateModel));

        sendHtmlMessage(to, "Verification for MagicMindset", htmlBody);
    }

    @Override
    public void sendEvaluationMail(String to, String username, String dateTime, String location) throws MessagingException {
        Map<String, Object> templateModel = Map.of("to", to, "asker", username,
                "dateTime",dateTime, "location", location);

        String htmlBody = thymeleafTemplateEngine.process("mail/evaluation_mail.html", createContext(templateModel));

        sendHtmlMessage(to, "Evaluation request for MagicMindset", htmlBody);
    }

    @Override
    public void sendRequestDenied(String to, String reason) throws MessagingException {
        Map<String, Object> templateModel = Map.of("to", to, "reason", reason);

        String htmlBody = thymeleafTemplateEngine.process("mail/request_denied_mail.html", createContext(templateModel));

        sendHtmlMessage(to, "Rejected Change Of Info", htmlBody);
    }

    @Override
    public void sendRequestAccepted(String to, String reason, UserInfo oldUser, UserInfo newUser) throws MessagingException {
        Map<String, Object> templateModel = Map.of("to", to,
                "oldEmail", oldUser.getUser().getEmail(),
                "newEmail", newUser.getUser().getEmail(),
                "oldName", oldUser.getName(),
                "newName", newUser.getName(),
                "oldAddress", oldUser.getAddress(),
                "newAddress", newUser.getAddress(),
                "oldCity", oldUser.getCity(),
                "newCity", newUser.getCity());

        String htmlBody = thymeleafTemplateEngine.process("mail/request_accepted_mail.html", createContext((templateModel)));

        sendHtmlMessage(to, "Accepted Change Of Info", htmlBody);
    }

    private void sendHtmlMessage(String to, String subject, String htmlBody) throws MessagingException {

        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(NOREPLY_ADDRESS);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlBody, true);
        emailSender.send(message);
    }

    private Context createContext(Map<String, Object> models) {
        Context thymeleafContext = new Context();
        thymeleafContext.setVariables(models);
        return thymeleafContext;
    }
}
