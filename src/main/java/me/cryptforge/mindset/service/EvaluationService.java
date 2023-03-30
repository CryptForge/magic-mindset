package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.evaluation.EditEvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationResponse;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.File;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface EvaluationService {

    /**
     * A method to get a single evaluation (from id)
     *
     * @param id The id that is searched for
     * @return An optional containing the evaluation or nothing
     */
    Optional<EvaluationResponse> getSingleEvaluation(Long id);

    /**
     * A method to get all evaluations
     *
     * @return An iterable of all evaluations
     */
    Iterable<EvaluationResponse> getAllEvaluations();

    /**
     * A method to get all evaluations from a specific trainee
     *
     * @param id The id of the trainee
     * @return All Evaluations with the trainee
     */
    Iterable<EvaluationResponse> getAllByTrainee(Long id);

    /**
     * A method to get all evaluations from a specific evaluator
     *
     * @param id The id of the evaluator
     * @return All Evaluations with the evaluator
     */
    Iterable<EvaluationResponse> getAllByEvaluator(Long id);

    /**
     * A method to edit the evaluation
     *
     * @param editEvaluationRequest The Request with all the data to be changed
     * @return The Evaluation or bad request when not found
     */
    EvaluationResponse editEvaluation(EditEvaluationRequest editEvaluationRequest) throws EntityNotFoundException;

    /**
     * Creates an evaluation and sends invites to participants
     *
     * @param evaluationRequest Request without models
     * @return The Evaluation or bad request
     */
    EvaluationResponse createEvaluation(EvaluationRequest evaluationRequest) throws EntityNotFoundException;

    void addConclusion(Long id, MultipartFile file);

    File getConclusion(Long id);
}
