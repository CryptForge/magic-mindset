package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.mail.MailDenyRequest;
import me.cryptforge.mindset.dto.skill.SkillResponse;
import me.cryptforge.mindset.dto.user.UserChangeInfoResponse;
import me.cryptforge.mindset.model.Course;
import me.cryptforge.mindset.model.PendingEdit;
import me.cryptforge.mindset.service.PendingEditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/changes")
public class AccountChangesController {

    @Autowired
    private PendingEditService pendingEditService;
    @GetMapping("/get/all")
    public List<UserChangeInfoResponse> getAllPendingEdits() {
        return pendingEditService.pendingEdits();
    }

    @GetMapping("/accept/{id}")
    public void getAcceptPendingEdit(@PathVariable Long id) {
        pendingEditService.acceptChange(id);
    }

    @PostMapping("/deny/{id}")
    public void geDenyPendingEdit(@PathVariable Long id, @RequestBody MailDenyRequest mailDenyRequest) {
        pendingEditService.denyChange(id, mailDenyRequest);
    }


}
