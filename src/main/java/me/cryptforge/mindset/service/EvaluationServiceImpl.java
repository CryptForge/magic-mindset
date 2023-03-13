package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.evaluation.EditEvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationRequest;
import me.cryptforge.mindset.model.Evaluation;
import me.cryptforge.mindset.model.Skill;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.model.user.UserInfo;
import me.cryptforge.mindset.repository.EvaluationRepository;
import me.cryptforge.mindset.repository.TraineeRepository;
import me.cryptforge.mindset.repository.UserInfoRepository;
import me.cryptforge.mindset.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EvaluationServiceImpl implements EvaluationService {
    @Autowired
    private EvaluationRepository evaluationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private TraineeRepository traineeRepository;

    @Override
    public ResponseEntity<?> getSingleEvaluation(String id) {
        Optional<Evaluation> singleEvaluation = evaluationRepository.findById(Long.valueOf(id));
        if (singleEvaluation.isPresent()) {
            return ResponseEntity.ok(singleEvaluation.get());
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<?> getAllEvaluations() {
        List<Evaluation> allEvaluations = new ArrayList<>();
        evaluationRepository.findAll().iterator().forEachRemaining(allEvaluations::add);
        return ResponseEntity.ok(allEvaluations);
    }

    @Override
    public ResponseEntity<?> getAllEvaluationsUser(String id) {
        List<Evaluation> allEvaluations = new ArrayList<>();
        evaluationRepository.findAllByTrainee_User_User_Id(Long.parseLong(id)).iterator().forEachRemaining(allEvaluations::add);
        return ResponseEntity.ok(allEvaluations);
    }

    @Override
    public ResponseEntity<?> editEvaluation(EditEvaluationRequest editEvaluationRequest) {
        Optional<User> user = userRepository.findById(editEvaluationRequest.traineeId());
        if (user.isEmpty()) {
            return returnBadRequest("user");
        }
        Optional<UserInfo> userInfo = userInfoRepository.findByUser(user.get());
        if (userInfo.isEmpty()) {
            return returnBadRequest("userInfo");
        }
        Optional<Trainee> trainee = traineeRepository.findByUser(userInfo.get());
        if (trainee.isEmpty()) {
            return returnBadRequest("trainee");
        }
        Optional<User> evaluatorUser = userRepository.findById(editEvaluationRequest.evaluatorId());
        if (evaluatorUser.isEmpty()) {
            return returnBadRequest("evaluator user");
        }
        Optional<UserInfo> evaluator = userInfoRepository.findByUser(user.get());
        if (evaluator.isEmpty()) {
            return returnBadRequest("evaluator userInfo");
        }
        Optional<Evaluation> optionalEvaluation = evaluationRepository.findById(editEvaluationRequest.id());
        if (optionalEvaluation.isEmpty()) {
            return returnBadRequest("evaluation");
        }
        Evaluation newEvaluation = optionalEvaluation.get();
        newEvaluation.setDate(editEvaluationRequest.date());
        newEvaluation.setLocation(editEvaluationRequest.location());
        newEvaluation.setConclusion(editEvaluationRequest.conclusion());
        newEvaluation.setEvaluator(evaluator.get());
        newEvaluation.setTrainee(trainee.get());

        Evaluation evaluation = evaluationRepository.save(newEvaluation);
        return ResponseEntity.ok(evaluation);
    }

    @Override
    public ResponseEntity<?> createEvaluation(EvaluationRequest evaluationRequest) {
        Optional<User> user = userRepository.findById(evaluationRequest.traineeId());
        if (user.isEmpty()) {
            return returnBadRequest("user");
        }
        Optional<UserInfo> userInfo = userInfoRepository.findByUser(user.get());
        if (userInfo.isEmpty()) {
            return returnBadRequest("userInfo");
        }
        Optional<Trainee> trainee = traineeRepository.findByUser(userInfo.get());
        if (trainee.isEmpty()) {
            return returnBadRequest("trainee");
        }
        Optional<User> evaluatorUser = userRepository.findById(evaluationRequest.evaluatorId());
        if (evaluatorUser.isEmpty()) {
            return returnBadRequest("evaluator user");
        }
        Optional<UserInfo> evaluator = userInfoRepository.findByUser(user.get());
        if (evaluator.isEmpty()) {
            return returnBadRequest("evaluator userInfo");
        }
        Evaluation newEvaluation = new Evaluation(evaluationRequest.date(),
                evaluationRequest.location(), evaluationRequest.conclusion(),
                evaluator.get(), trainee.get());
        Evaluation evaluation = evaluationRepository.save(newEvaluation);
        return ResponseEntity.ok(evaluation);
    }

    private ResponseEntity<String> returnBadRequest(String type) {
        return ResponseEntity.badRequest().body("No " + type + " with that id could be found!");
    }
}
