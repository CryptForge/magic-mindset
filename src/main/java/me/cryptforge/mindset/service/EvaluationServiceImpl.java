package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.evaluation.EditEvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationRequest;
import me.cryptforge.mindset.dto.evaluation.EvaluationResponse;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.Course;
import me.cryptforge.mindset.model.Evaluation;
import me.cryptforge.mindset.model.EvaluationInvitation;
import me.cryptforge.mindset.model.File;
import me.cryptforge.mindset.model.user.*;
import me.cryptforge.mindset.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.StreamSupport;

@Service
public class EvaluationServiceImpl implements EvaluationService {

    @Autowired
    private EvaluationRepository evaluationRepository;
    @Autowired
    private InvitationRepository invitationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private TraineeRepository traineeRepository;
    @Autowired
    private CoachRepository coachRepository;
    @Autowired
    private ManagerRepository managerRepository;
    @Autowired
    private FileService fileService;

    @Override
    public Optional<EvaluationResponse> getSingleEvaluation(Long id) {
        return evaluationRepository.findById(id)
                .map(EvaluationResponse::fromEvaluation);
    }

    @Override
    public Iterable<EvaluationResponse> getAllEvaluations() {
        return StreamSupport.stream(evaluationRepository.findAll().spliterator(), false)
                .map(EvaluationResponse::fromEvaluation)
                .toList();
    }

    @Override
    public Iterable<EvaluationResponse> getAllByTrainee(Long id) {
        final Trainee trainee = traineeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(("trainee")));

        return StreamSupport.stream(evaluationRepository.findAllByTrainee(trainee).spliterator(), false)
                .map(EvaluationResponse::fromEvaluation)
                .toList();
    }

    @Override
    public Iterable<EvaluationResponse> getAllByEvaluator(Long id) {
        final UserInfo userInfo = userInfoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(("user")));

        final Optional<Coach> coach = coachRepository.findByUser(userInfo);
        final Optional<Manager> manager = managerRepository.findByUser(userInfo);

        if (coach.isEmpty() && manager.isEmpty()) {
            throw new EntityNotFoundException(("coach or manager"));
        }

        return StreamSupport.stream(evaluationRepository.findAllByEvaluator(userInfo).spliterator(), false)
                .map(EvaluationResponse::fromEvaluation)
                .toList();
    }

    @Override
    public EvaluationResponse editEvaluation(EditEvaluationRequest request) throws EntityNotFoundException {
        final User user = userRepository.findById(request.traineeId())
                .orElseThrow(() -> new EntityNotFoundException("user"));
        final UserInfo userInfo = userInfoRepository.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("userInfo"));
        final Trainee trainee = traineeRepository.findByUser(userInfo)
                .orElseThrow(() -> new EntityNotFoundException("trainee"));
        final User evaluatorUser = userRepository.findById(request.evaluatorId())
                .orElseThrow(() -> new EntityNotFoundException("evaluator user"));
        final UserInfo evaluator = userInfoRepository.findByUser(evaluatorUser)
                .orElseThrow(() -> new EntityNotFoundException("evaluator userInfo"));
        final Evaluation evaluation = evaluationRepository.findById(request.id())
                .orElseThrow(() -> new EntityNotFoundException("evaluation"));

        evaluation.setDate(request.date());
        evaluation.setLocation(request.location());
        evaluation.setEvaluator(evaluator);
        evaluation.setTrainee(trainee);

        return EvaluationResponse.fromEvaluation(evaluationRepository.save(evaluation));
    }

    @Override
    public EvaluationResponse createEvaluation(EvaluationRequest request) throws EntityNotFoundException {
        final UserInfo traineeUser = userInfoRepository.findById(request.traineeId())
                .orElseThrow(() -> new EntityNotFoundException("trainee"));
        final Trainee trainee = traineeRepository.findByUser(traineeUser)
                .orElseThrow(() -> new EntityNotFoundException("trainee"));
        final UserInfo evaluator = userInfoRepository.findById(request.evaluatorId())
                .orElseThrow(() -> new EntityNotFoundException("evaluator"));


        final Evaluation evaluation = evaluationRepository.save(new Evaluation(
                request.date(),
                request.location(),
                evaluator,
                trainee
        ));

        final long currentTime = System.currentTimeMillis();
        final long timeDifference = currentTime - request.date().getTime();
        final Date reminderDate = new Date(currentTime + timeDifference / 2);
        final EvaluationInvitation invitation = new EvaluationInvitation(
                request.isTrainee() ? evaluator : traineeUser,
                evaluation,
                reminderDate
        );
        invitationRepository.save(invitation);

        return EvaluationResponse.fromEvaluation(evaluation);
    }

    @Override
    public void addConclusion(Long id, MultipartFile multipartFile) {
        String uuidString = fileService.saveFileUUIDBack(multipartFile);
        Evaluation evaluation = evaluationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("evaluation"));
        evaluation.setConclusionFileName(uuidString);
        evaluationRepository.save(evaluation);
    }

    @Override
    public File getConclusion(Long id) {
        Evaluation evaluation = evaluationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("evaluation"));
        return fileService.getFile(evaluation.getConclusionFileName());
    }
}
