package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.course.CourseEditRequest;
import me.cryptforge.mindset.dto.course.CourseRequest;
import me.cryptforge.mindset.dto.course.CourseResponseWithoutTrainee;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.Course;
import me.cryptforge.mindset.model.File;
import me.cryptforge.mindset.model.Skill;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.model.user.User;
import me.cryptforge.mindset.model.user.UserInfo;
import me.cryptforge.mindset.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.StreamSupport;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private SkillRepository skillRepository;
    @Autowired
    private TraineeRepository traineeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private FileService fileService;

    @Override
    public ResponseEntity<?> getSingleCourse(String id) {
        Optional<Course> singleCourse = courseRepository.findById(Long.valueOf(id));
        if (singleCourse.isPresent()) {
            return ResponseEntity.ok(singleCourse.get());
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> allCourses = new ArrayList<>();
        courseRepository.findAll().iterator().forEachRemaining(allCourses::add);
        return ResponseEntity.ok(allCourses);
    }

    @Override
    public ResponseEntity<List<CourseResponseWithoutTrainee>> getAllCoursesUser(String id) {
        final Iterable<Course> allCourses = courseRepository.findAllByTrainee_User_User_Id(Long.valueOf(id));

        final var updatedCourses = StreamSupport.stream(allCourses.spliterator(), false)
                .map(course -> new CourseResponseWithoutTrainee(
                        course.getId(), course.getName(), course.getSkill(),
                        course.getProgress(), course.getCertificationFileName()
                )).toList();
        return ResponseEntity.ok(updatedCourses);
    }

    @Override
    public ResponseEntity<?> createNewCourse(CourseRequest courseRequest) {
        Optional<Skill> skill = skillRepository.findById(courseRequest.skillId());
        if (skill.isEmpty()) {
            return returnBadRequest("skill");
        }
        Optional<User> user = userRepository.findById(courseRequest.traineeId());
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
        Course course = new Course(courseRequest.name(), skill.get(), courseRequest.progress(), courseRequest.certification(), trainee.get());
        Course savedCourse = courseRepository.save(course);
        return ResponseEntity.accepted().body(savedCourse);
    }

    @Override
    public ResponseEntity<?> editCourse(CourseEditRequest courseEditRequest) {
        Optional<Course> optionalCourse = courseRepository.findById(courseEditRequest.id());
        if (optionalCourse.isEmpty()) {
            return returnBadRequest("course");
        }
        Optional<Skill> skill = skillRepository.findById(courseEditRequest.skillId());
        if (skill.isEmpty()) {
            return returnBadRequest("skill");
        }
        Course course = optionalCourse.get();
        course.setName(courseEditRequest.name());
        course.setCertificationFileName(courseEditRequest.certificationFileName());
        course.setSkill(skill.get());
        course.setProgress(courseEditRequest.progress());

        Course savedCourse = courseRepository.save(course);
        return ResponseEntity.accepted().body(savedCourse);
    }

    @Override
    public ResponseEntity<?> deleteCourse(Long id) {
        courseRepository.deleteById(id);
        return ResponseEntity.ok().body(true);
    }

    @Override
    public void addCertification(Long id, MultipartFile multipartFile) {
        String uuidString = fileService.saveFileUUIDBack(multipartFile);
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("course"));
        course.setCertificationFileName(uuidString);
        courseRepository.save(course);
    }

    @Override
    public File getCertification(String id) {
        Course course = courseRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new EntityNotFoundException("course"));
        return fileService.getFile(course.getCertificationFileName());
    }

    private ResponseEntity<String> returnBadRequest(String type) {
        return ResponseEntity.badRequest().body("No " + type + " with that id could be found!");
    }
}
