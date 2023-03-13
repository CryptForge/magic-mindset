package me.cryptforge.mindset.controller;


import me.cryptforge.mindset.dto.course.CourseEditRequest;
import me.cryptforge.mindset.dto.course.CourseRequest;
import me.cryptforge.mindset.dto.course.CourseResponseWithoutTrainee;
import me.cryptforge.mindset.model.Course;
import me.cryptforge.mindset.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    CourseService courseService;

    @GetMapping("/get/single/{id}")
    public ResponseEntity<?> getSingleCourse(@PathVariable String id) {
        return courseService.getSingleCourse(id);
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<Course>> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/get/all/user/{id}")
    public ResponseEntity<List<CourseResponseWithoutTrainee>> getAllCoursesUser(@PathVariable String id) {
        return courseService.getAllCoursesUser(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createNewCourse(@RequestBody CourseRequest courseRequest) {
        return courseService.createNewCourse(courseRequest);
    }

    @PostMapping("/edit")
    public ResponseEntity<?> editCourse(@RequestBody CourseEditRequest courseEditRequest) {
        return courseService.editCourse(courseEditRequest);
    }

    @GetMapping("/delete")
    public ResponseEntity<?> deleteCourse(@RequestBody Long id) {
        return courseService.deleteCourse(id);
    }

}
