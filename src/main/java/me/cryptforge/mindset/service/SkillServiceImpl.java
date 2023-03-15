package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.skill.SkillEditRequest;
import me.cryptforge.mindset.dto.skill.SkillRequest;
import me.cryptforge.mindset.dto.skill.SkillResponseWithoutTrainee;
import me.cryptforge.mindset.model.Course;
import me.cryptforge.mindset.model.Skill;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.model.user.UserInfo;
import me.cryptforge.mindset.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<?> getSingleSkill(String id) {
        Optional<Skill> singleSkill = skillRepository.findById(Long.valueOf(id));
        if (singleSkill.isPresent()) {
            return ResponseEntity.ok(singleSkill.get());
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<List<Skill>> getAllSkills() {
        List<Skill> allSkills = new ArrayList<>();
        skillRepository.findAll().iterator().forEachRemaining(allSkills::add);
        return ResponseEntity.ok(allSkills);
    }

    @Override
    public ResponseEntity<List<SkillResponseWithoutTrainee>> getAllSkillsUser(String id) {
        List<Skill> allSkills = new ArrayList<>();
        skillRepository.findAllByTrainee_User_User_Id(Long.valueOf(id)).iterator().forEachRemaining(allSkills::add);

        List<SkillResponseWithoutTrainee> updatedSkills = new ArrayList<>();
        allSkills.forEach(value -> updatedSkills.add(
                new SkillResponseWithoutTrainee(
                        value.getId(), value.isType(),
                        value.getName(), value.getDescription(),
                        value.getCourses()
                )));
        return ResponseEntity.ok(updatedSkills);
    }

    @Override
    public ResponseEntity<?> createNewSkill(SkillRequest skillRequest) {
        List<Course> courses = new ArrayList<>();
        skillRequest.courseIds().forEach(value -> courses.add(courseRepository.findById(value).get()));
        Optional<User> user = userRepository.findById(skillRequest.traineeId());
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

        Skill skill = new Skill(skillRequest.type(), skillRequest.name(),
                skillRequest.description(), courses,
                trainee.get()
        );
        Skill savedSkill = skillRepository.save(skill);
        return ResponseEntity.ok(savedSkill);
    }

    @Override
    public ResponseEntity<?> editSkill(SkillEditRequest skillEditRequest) {
        Optional<Skill> optionalSkill = skillRepository.findById(skillEditRequest.id());

        if (optionalSkill.isEmpty()) {
            return returnBadRequest("skill");
        }
        List<Course> courses = new ArrayList<>();
        skillEditRequest.courseIds().forEach(value -> courses.add(courseRepository.findById(value).get()));

        Skill skill = optionalSkill.get();
        skill.setCourses(courses);
        skill.setName(skillEditRequest.name());
        skill.setDescription(skillEditRequest.description());
        skill.setType(skillEditRequest.type());

        Skill savedSkill = skillRepository.save(skill);

        return ResponseEntity.ok(savedSkill);
    }

    @Override
    public ResponseEntity<?> deleteSkillAndCoursesAssociatedWithSkill(Long id) {
        courseRepository.deleteBySkill_id(id);
        skillRepository.deleteById(id);
        return ResponseEntity.ok().body(true);
    }

    private ResponseEntity<String> returnBadRequest(String type) {
        return ResponseEntity.badRequest().body("No " + type + " with that id could be found!");
    }
}
