package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.invitation.InvitationResponse;
import me.cryptforge.mindset.service.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/invitation")
public class InvitationController {

    @Autowired
    InvitationService service;

    @GetMapping("/{id}")
    public ResponseEntity<InvitationResponse> getInvitation(@PathVariable Long id) {
        return ResponseEntity.of(service.getInvitation(id));
    }

    @GetMapping("/all/user/{id}")
    public Iterable<InvitationResponse> getAllByUser(@PathVariable Long id) {
        return service.getByUser(id);
    }

    @GetMapping("/all/evaluation/{id}")
    public Iterable<InvitationResponse> getAllByEvaluation(@PathVariable Long id) {
        return service.getByEvaluation(id);
    }

}
