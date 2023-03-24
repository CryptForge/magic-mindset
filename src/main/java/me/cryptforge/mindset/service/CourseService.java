package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.course.CourseEditRequest;
import me.cryptforge.mindset.dto.course.CourseRequest;
import me.cryptforge.mindset.dto.course.CourseResponseWithoutTrainee;
import me.cryptforge.mindset.model.Course;
import me.cryptforge.mindset.model.File;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CourseService {
    /**
     * A method that gets a single course from id
     *
     * @param id - The id that is used to search the single course
     * @return - Returns the single course or a not found response.
     */
    ResponseEntity<?> getSingleCourse(String id);

    /**
     * A method that searches all courses in the database
     *
     * @return - Returns all courses or none when there aren't any.
     */
    ResponseEntity<List<Course>> getAllCourses();

    /**
     * A method that searches all courses of a user in the database.
     *
     * @param id - The id of the user which the values need to be found from.
     * @return - Returns a list with all courses from a user or empty.
     */
    ResponseEntity<List<CourseResponseWithoutTrainee>> getAllCoursesUser(String id);

    /**
     * A method that creates a new course from a specialized request
     *
     * @param courseRequest -  A course request that doesn't hold other models but ids.
     * @return - Returns a course or a BadRequest when values aren't present.
     */
    ResponseEntity<?> createNewCourse(CourseRequest courseRequest);

    /**
     * A method that edits a course except the trainee. Which will always be the same.
     *
     * @param courseEditRequest - The edit request gotten from the frontend.
     * @return - Returns a course or a BadRequest when values aren't present.
     */
    ResponseEntity<?> editCourse(CourseEditRequest courseEditRequest);

    /**
     * A method that deletes a course from the database
     *
     * @param id - The id from the course that is to be deleted
     * @return - Returns a ok response after deletion.
     */
    ResponseEntity<?> deleteCourse(Long id);

    void addCertification(Long id, MultipartFile multipartFile);

    File getCertification(String id);
}
