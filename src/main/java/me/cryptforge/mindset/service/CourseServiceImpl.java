package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.course.CourseEditRequest;
import me.cryptforge.mindset.dto.course.CourseRequest;
import me.cryptforge.mindset.dto.course.CourseResponse;
import me.cryptforge.mindset.exception.EntityNotFoundException;
import me.cryptforge.mindset.model.Course;
import me.cryptforge.mindset.model.File;
import me.cryptforge.mindset.model.Skill;
import me.cryptforge.mindset.model.user.Trainee;
import me.cryptforge.mindset.repository.CourseRepository;
import me.cryptforge.mindset.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.stream.StreamSupport;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private SkillRepository skillRepository;
    @Autowired
    private FileService fileService;

    @Override
    public Optional<CourseResponse> getSingleCourse(Long id) {
        return courseRepository.findById(id).map(CourseResponse::fromCourse);
    }

    @Override
    public Iterable<CourseResponse> getAllCourses() {
        return StreamSupport.stream(courseRepository.findAll().spliterator(), false)
                .map(CourseResponse::fromCourse)
                .toList();
    }

    @Override
    public Iterable<CourseResponse> getAllByUser(Long id) {
        final Iterable<Course> allCourses = courseRepository.findAllByTrainee_User_User_Id(id);

        return StreamSupport.stream(allCourses.spliterator(), false)
                .map(CourseResponse::fromCourse)
                .toList();
    }

    @Override
    public Iterable<CourseResponse> getAllBySkill(Long id) {
        final Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("skill"));
        final Iterable<Course> courses = courseRepository.findAllBySkill(skill);

        return StreamSupport.stream(courses.spliterator(), false)
                .map(CourseResponse::fromCourse)
                .toList();
    }

    @Override
    public CourseResponse createNewCourse(CourseRequest request) {
        final Skill skill = skillRepository.findById(request.skill())
                .orElseThrow(() -> new EntityNotFoundException("skill"));
        final Trainee trainee = skill.getTrainee();

        final Course course = new Course(request.name(), skill, 0, null, trainee);
        return CourseResponse.fromCourse(courseRepository.save(course));
    }

    @Override
    public CourseResponse editCourse(CourseEditRequest request) {
        final Course course = courseRepository.findById(request.id())
                .orElseThrow(() -> new EntityNotFoundException("course"));

        course.setName(request.name());
        course.setProgress(request.progress());

        return CourseResponse.fromCourse(courseRepository.save(course));
    }

    @Override
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
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
    public File getCertification(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("course"));
        return fileService.getFile(course.getCertificationFileName());
    }
}
