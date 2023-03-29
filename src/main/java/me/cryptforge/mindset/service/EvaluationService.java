package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.evaluation.EditEvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationRequest;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.Evaluation;

import java.util.Optional;

public interface EvaluationService {

    /**
     * A method to get a single evaluation (from id)
     *
     * @param id The id that is searched for
     * @return An optional containing the evaluation or nothing
     */
    Optional<Evaluation> getSingleEvaluation(Long id);

    /**
     * A method to get all evaluations
     *
     * @return An iterable of all evaluations
     */
    Iterable<Evaluation> getAllEvaluations();

    /**
     * A method to get all evaluations from a specific user
     *
     * @param id The id of the user
     * @return All Evaluations with the user
     */
    Iterable<Evaluation> getAllEvaluationsUser(Long id);

    /**
     * A method to edit the evaluation
     *
     * @param editEvaluationRequest The Request with all the data to be changed
     * @return The Evaluation or bad request when not found
     */
    Evaluation editEvaluation(EditEvaluationRequest editEvaluationRequest) throws EntityNotFoundException;

    /**
     * Creates an evaluation and sends invites to participants
     *
     * @param evaluationRequest Request without models
     * @return The Evaluation or bad request
     */
    Evaluation createEvaluation(EvaluationRequest evaluationRequest) throws EntityNotFoundException;
}
