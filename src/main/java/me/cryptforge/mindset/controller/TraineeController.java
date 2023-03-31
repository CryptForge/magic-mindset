package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.user.trainee.CompactTraineeResponse;
import me.cryptforge.mindset.dto.user.trainee.TraineeResponse;
import me.cryptforge.mindset.service.TraineeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/trainee")
public class TraineeController {

    @Autowired
    TraineeService service;

    @GetMapping("/{id}")
    public ResponseEntity<TraineeResponse> getTrainee(@PathVariable Long id) {
        return ResponseEntity.of(service.getTrainee(id));
    }

    @GetMapping("/all")
    public Iterable<CompactTraineeResponse> getAll() {
        return service.getAll();
    }

    @GetMapping("/all/coach/{id}")
    public Iterable<CompactTraineeResponse> getAllByCoach(@PathVariable Long id) {
        return service.getAllByCoach(id);
    }

    @GetMapping("/all/manager/{id}")
    public Iterable<CompactTraineeResponse> getAllByManager(@PathVariable Long id) {
        return service.getAllByManager(id);
    }

    @PostMapping("/{id}/coach")
    public TraineeResponse changeCoach(@PathVariable Long id, @RequestBody Long coachId) {
        return service.changeCoach(id, coachId);
    }

    @PostMapping("/{id}/manager")
    public TraineeResponse changeManager(@PathVariable Long id, @RequestBody Long managerId) {
        return service.changeManager(id, managerId);
    }

}
