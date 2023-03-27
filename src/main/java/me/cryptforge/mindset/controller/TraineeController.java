package me.cryptforge.mindset.controller;

import me.cryptforge.mindset.dto.user.trainee.EditCoachRequest;
import me.cryptforge.mindset.dto.user.trainee.EditManagerRequest;
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

    @PutMapping("/coach")
    public TraineeResponse editCoach(@RequestBody EditCoachRequest editCoachRequest) {
        return service.editCoach(editCoachRequest);
    }

    @PutMapping("/manager")
    public TraineeResponse editManager(@RequestBody EditManagerRequest editManagerRequest) {
        return service.editManager(editManagerRequest);
    }

}
