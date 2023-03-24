package me.cryptforge.mindset.service;

import me.cryptforge.mindset.dto.course.CourseEditRequest;
import me.cryptforge.mindset.dto.course.CourseRequest;
import me.cryptforge.mindset.dto.course.CourseResponse;
import me.cryptforge.mindset.model.File;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface CourseService {

    /**
     * A method that gets a single course from id
     *
     * @param id The id that is used to search the single course
     * @return The single course or a not found response.
     */
    Optional<CourseResponse> getSingleCourse(Long id);

    /**
     * A method that searches all courses in the database
     *
     * @return All courses or none when there aren't any.
     */
    Iterable<CourseResponse> getAllCourses();

    /**
     * A method that searches all courses of a user in the database.
     *
     * @param id The id of the user which the values need to be found from.
     * @return A list with all courses from a user or empty.
     */
    Iterable<CourseResponse> getAllByUser(Long id);

    /**
     * Finds all courses linked to specified skill.
     *
     * @param id Skill id
     * @return Iterable that contains all courses linked to specified skill.
     */
    Iterable<CourseResponse> getAllBySkill(Long id);

    /**
     * A method that creates a new course from a specialized request
     *
     * @param courseRequest A course request that doesn't hold other models but ids.
     * @return The created course.
     */
    CourseResponse createNewCourse(CourseRequest courseRequest);

    /**
     * A method that edits a course except the trainee. Which will always be the same.
     *
     * @param courseEditRequest - The edit request gotten from the frontend.
     * @return The edited course.
     */
    CourseResponse editCourse(CourseEditRequest courseEditRequest);

    /**
     * A method that deletes a course from the database
     *
     * @param id The id from the course that is to be deleted
     */
    void deleteCourse(Long id);

    void addCertification(Long id, MultipartFile multipartFile);

    File getCertification(Long id);
}
