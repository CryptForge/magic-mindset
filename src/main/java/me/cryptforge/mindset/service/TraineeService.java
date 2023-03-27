package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.user.trainee.EditCoachRequest;
import me.cryptforge.mindset.dto.user.trainee.EditManagerRequest;
import me.cryptforge.mindset.dto.user.trainee.CompactTraineeResponse;
import me.cryptforge.mindset.dto.user.trainee.TraineeResponse;

import java.util.Optional;

public interface TraineeService {

    /**
     * Gets a trainee by their id
     *
     * @param id Trainee id
     * @return Optional containing trainee, or nothing
     */
    Optional<TraineeResponse> getTrainee(Long id);

    /**
     * Gets all trainees
     *
     * @return All trainees
     */
    Iterable<CompactTraineeResponse> getAll();

    /**
     * Gets all trainees by their coach
     *
     * @param coachId Id of coach to search by
     * @return All trainees with specified coach
     */
    Iterable<CompactTraineeResponse> getAllByCoach(Long coachId);

    /**
     * Gets all trainees by their manager
     *
     * @param managerId Id of manager to search by
     * @return All trainees with specified manager
     */
    Iterable<CompactTraineeResponse> getAllByManager(Long managerId);

    /**
     * Changes the coach of a trainee
     *
     * @param editCoachRequest Edit request
     * @return Edited trainee
     */
    TraineeResponse editCoach(EditCoachRequest editCoachRequest);

    /**
     * Changes the manager of a trainee
     *
     * @param editManagerRequest Edit request
     * @return Edited trainee
     */
    TraineeResponse editManager(EditManagerRequest editManagerRequest);
}
