package me.cryptforge.mindset.dto.mail;

public record MailDenyRequest(
        String to,
        String reason
) {
}
