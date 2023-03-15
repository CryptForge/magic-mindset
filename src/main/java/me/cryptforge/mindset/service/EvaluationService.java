package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.evaluation.EditEvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationRequest;
import org.springframework.http.ResponseEntity;

public interface EvaluationService {
    /**
     * A method to get a single evaluation (from id)
     *
     * @param id - The id that is searched for
     * @return - Returns the Evaluation or bad request
     */
    ResponseEntity<?> getSingleEvaluation(String id);

    /**
     * A method to get all evaluations
     *
     * @return - Returns all Evaluations or an empty list
     */
    ResponseEntity<?> getAllEvaluations();

    /**
     * A method to get all evaluations from a specific user
     *
     * @param id - The id of the user
     * @return - Returns all Evaluations or an empty list
     */
    ResponseEntity<?> getAllEvaluationsUser(String id);

    /**
     * A method to edit the evaluation
     *
     * @param editEvaluationRequest - The Request with all the data to be changed
     * @return - Returns the Evaluation or bad request when not found
     */
    ResponseEntity<?> editEvaluation(EditEvaluationRequest editEvaluationRequest);

    /**
     * A method to create an evaluation
     *
     * @param evaluationRequest - Request without models
     * @return - Returns the Evaluation or bad request
     */
    ResponseEntity<?> createEvaluation(EvaluationRequest evaluationRequest);
}
