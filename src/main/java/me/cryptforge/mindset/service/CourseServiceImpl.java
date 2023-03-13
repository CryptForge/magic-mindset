package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.course.CourseEditRequest;
import me.cryptforge.mindset.dto.course.CourseRequest;
import me.cryptforge.mindset.dto.course.CourseResponseWithoutTrainee;
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
public class CourseServiceImpl implements CourseService {

    @Autowired
    CourseRepository courseRepository;
    @Autowired
    SkillRepository skillRepository;
    @Autowired
    private TraineeRepository traineeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;

    /**
     * A method that gets a single course from id
     * @param id - The id that is used to search the single course
     * @return - Returns the single course or a not found response.
     */
    @Override
    public ResponseEntity<?> getSingleCourse(String id) {
        Optional<Course> singleCourse = courseRepository.findById(Long.valueOf(id));
        if (singleCourse.isPresent()) {
            return ResponseEntity.ok(singleCourse.get());
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * A method that searches all courses in the database
     * @return - Returns all courses or none when there aren't any.
     */
    @Override
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> allCourses = new ArrayList<>();
        courseRepository.findAll().iterator().forEachRemaining(allCourses::add);
        return ResponseEntity.ok(allCourses);
    }

    /**
     * A method that searches all courses of a user in the database.
     * @param id - The id of the user which the values need to be found from.
     * @return - Returns a list with all courses from a user or empty.
     */
    @Override
    public ResponseEntity<List<CourseResponseWithoutTrainee>> getAllCoursesUser(String id) {
        List<Course> allCourses = new ArrayList<>();
        courseRepository.findAllByTrainee_User_User_Id(Long.valueOf(id)).iterator().forEachRemaining(allCourses::add);

        List<CourseResponseWithoutTrainee> updatedCourses = new ArrayList<>();
        allCourses.forEach(value -> updatedCourses.add(
                new CourseResponseWithoutTrainee(
                        value.getId(), value.getSkill(),
                        value.getProgress(), value.getCertification())));
        return ResponseEntity.ok(updatedCourses);
    }

    /**
     * A method that creates a new course from a specialized request
     * @param courseRequest -  A course request that doesn't hold other models but ids.
     * @return - Returns a course or a BadRequest when values aren't present.
     */
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
        Optional<UserInfo> userInfo = userInfoRepository.findById(user.get());
        if (userInfo.isEmpty()) {
            return returnBadRequest("userInfo");
        }
        Optional<Trainee> trainee = traineeRepository.findById(userInfo.get());
        if (trainee.isEmpty()) {
            return returnBadRequest("trainee");
        }
        Course course = new Course(skill.get(), courseRequest.progress(), courseRequest.certification(), trainee.get());
        Course savedCourse = courseRepository.save(course);
        return ResponseEntity.accepted().body(savedCourse);
    }

    /**
     * A method that edits a course except the trainee. Which will always be the same.
     * @param courseEditRequest - The Request gotten from the frontend.
     * @return - Returns a course or a BadRequest when values aren't present.
     */
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
        course.setCertification(courseEditRequest.certification());
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

    private ResponseEntity<String> returnBadRequest(String type) {
        return ResponseEntity.badRequest().body("No " + type + " with that id could be found!");
    }
}
