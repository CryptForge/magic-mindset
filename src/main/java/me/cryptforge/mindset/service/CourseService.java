package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.course.CourseEditRequest;
import me.cryptforge.mindset.dto.course.CourseRequest;
import me.cryptforge.mindset.dto.course.CourseResponseWithoutTrainee;
import me.cryptforge.mindset.model.Course;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CourseService {

    ResponseEntity<?> getSingleCourse(String id);

    ResponseEntity<List<Course>> getAllCourses();

    ResponseEntity<List<CourseResponseWithoutTrainee>> getAllCoursesUser(String id);

    ResponseEntity<?> createNewCourse(CourseRequest courseRequest);

    ResponseEntity<?> editCourse(CourseEditRequest courseEditRequest);

    ResponseEntity<?> deleteCourse(Long id);
}
