package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.user.trainee.CompactTraineeResponse;
import me.cryptforge.mindset.dto.user.trainee.TraineeResponse;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.user.Coach;
import me.cryptforge.mindset.model.user.Manager;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.repository.CoachRepository;
import me.cryptforge.mindset.repository.ManagerRepository;
import me.cryptforge.mindset.repository.TraineeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.StreamSupport;

@Service
public class TraineeServiceImpl implements TraineeService {

    @Autowired
    TraineeRepository repository;

    @Autowired
    CoachRepository coachRepository;

    @Autowired
    ManagerRepository managerRepository;

    @Override
    public Optional<TraineeResponse> getTrainee(Long id) {
        return repository.findById(id).map(TraineeResponse::fromTrainee);
    }

    @Override
    public Iterable<CompactTraineeResponse> getAll() {
        return StreamSupport.stream(repository.findAll().spliterator(), false)
                .map(CompactTraineeResponse::fromTrainee)
                .toList();
    }

    @Override
    public Iterable<CompactTraineeResponse> getAllByCoach(Long coachId) {
        final Coach coach = coachRepository.findById(coachId)
                .orElseThrow(() -> new EntityNotFoundException("coach"));

        return StreamSupport.stream(repository.findAllByCoach(coach).spliterator(), false)
                .map(CompactTraineeResponse::fromTrainee)
                .toList();
    }

    @Override
    public Iterable<CompactTraineeResponse> getAllByManager(Long managerId) {
        final Manager manager = managerRepository.findById(managerId)
                .orElseThrow(() -> new EntityNotFoundException("manager"));

        return StreamSupport.stream(repository.findAllByManager(manager).spliterator(), false)
                .map(CompactTraineeResponse::fromTrainee)
                .toList();
    }

    @Override
    public TraineeResponse changeCoach(Long id, Long coachId) {
        final Trainee trainee = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("trainee"));
        final Coach coach = coachRepository.findById(coachId)
                .orElseThrow(() -> new EntityNotFoundException("coach"));

        trainee.setCoach(coach);

        return TraineeResponse.fromTrainee(repository.save(trainee));
    }

    @Override
    public TraineeResponse changeManager(Long id, Long managerId) {
        final Trainee trainee = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("trainee"));
        final Manager manager = managerRepository.findById(managerId)
                .orElseThrow(() -> new EntityNotFoundException("manager"));

        trainee.setManager(manager);

        return TraineeResponse.fromTrainee(repository.save(trainee));
    }
}
