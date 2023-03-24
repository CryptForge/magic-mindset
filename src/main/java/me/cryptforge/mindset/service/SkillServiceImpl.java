package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.skill.SkillEditRequest;
import me.cryptforge.mindset.dto.skill.SkillRequest;
import me.cryptforge.mindset.dto.skill.SkillResponse;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.Skill;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.model.user.UserInfo;
import me.cryptforge.mindset.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.StreamSupport;

@Service
public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private TraineeRepository traineeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;

    @Override
    public Optional<SkillResponse> getSingleSkill(Long id) {
        return skillRepository.findById(id).map(SkillResponse::fromSkill);
    }

    @Override
    public Iterable<SkillResponse> getAllSkills() {
        return StreamSupport.stream(skillRepository.findAll().spliterator(), false)
                .map(SkillResponse::fromSkill)
                .toList();
    }

    @Override
    public Iterable<SkillResponse> getAllUserSkills(Long id) {
        final Iterable<Skill> skills = skillRepository.findAllByTrainee_User_User_Id(id);
        return StreamSupport.stream(skills.spliterator(),false)
                .map(SkillResponse::fromSkill)
                .toList();
    }

    @Override
    public SkillResponse createNewSkill(SkillRequest request) {
        final User user = userRepository.findById(request.traineeId())
                .orElseThrow(() -> new EntityNotFoundException("user"));
        final UserInfo userInfo = userInfoRepository.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("userInfo"));
        final Trainee trainee = traineeRepository.findByUser(userInfo)
                .orElseThrow(() -> new EntityNotFoundException("trainee"));

        final Skill skill = new Skill(
                request.type(), request.name(),
                request.description(), new ArrayList<>(),
                trainee
        );
        return SkillResponse.fromSkill(skillRepository.save(skill));
    }

    @Override
    public SkillResponse editSkill(SkillEditRequest request) {
        final Skill skill = skillRepository.findById(request.id())
                .orElseThrow(() -> new EntityNotFoundException("skill"));

        skill.setName(request.name());
        skill.setDescription(request.description());
        skill.setType(request.type());

        return SkillResponse.fromSkill(skillRepository.save(skill));
    }

    @Override
    public void deleteSkillAndCoursesAssociatedWithSkill(Long id) {
        courseRepository.deleteBySkill_id(id);
        skillRepository.deleteById(id);
    }
}
