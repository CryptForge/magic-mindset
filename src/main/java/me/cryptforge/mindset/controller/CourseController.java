package me.cryptforge.mindset.controller;


import me.cryptforge.mindset.dto.course.CourseEditRequest;
import me.cryptforge.mindset.dto.course.CourseRequest;
import me.cryptforge.mindset.dto.course.CourseResponse;
import me.cryptforge.mindset.model.File;
import me.cryptforge.mindset.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;

@RestController
@CrossOrigin
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    CourseService courseService;

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponse> getSingleCourse(@PathVariable Long id) {
        return ResponseEntity.of(courseService.getSingleCourse(id));
    }

    @GetMapping("/all")
    public Iterable<CourseResponse> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/all/user/{id}")
    public Iterable<CourseResponse> getAllByUser(@PathVariable Long id) {
        return courseService.getAllByUser(id);
    }

    @GetMapping("all/skill/{id}")
    public Iterable<CourseResponse> getAllBySkill(@PathVariable Long id) {
        return courseService.getAllBySkill(id);
    }

    @PostMapping("/create")
    public CourseResponse createNewCourse(@RequestBody CourseRequest courseRequest) {
        return courseService.createNewCourse(courseRequest);
    }

    @PutMapping("/edit")
    public CourseResponse editCourse(@RequestBody CourseEditRequest courseEditRequest) {
        return courseService.editCourse(courseEditRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok("Course deleted");
    }

    @PostMapping("/edit/certification")
    public void editCertification(@RequestParam("id") Long id,
                                  @RequestParam("file") MultipartFile file) {
        courseService.addCertification(id, file);
    }

    @GetMapping(value = "/get/certification/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getCertification(@PathVariable Long id) {
        File file = courseService.getCertification(id);
        try {
            return file.getFile().getBinaryStream().readAllBytes();
        } catch (IOException | SQLException e) {
            throw new RuntimeException(e);
        }
    }

}
