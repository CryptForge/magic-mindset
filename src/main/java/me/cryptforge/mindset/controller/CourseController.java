package me.cryptforge.mindset.controller;


import com.nimbusds.common.contenttype.ContentType;
import jakarta.servlet.http.HttpServletResponse;
import me.cryptforge.mindset.dto.course.CourseEditRequest;
import me.cryptforge.mindset.dto.course.CourseRequest;
import me.cryptforge.mindset.dto.course.CourseResponseWithoutTrainee;
import me.cryptforge.mindset.dto.user.EditProfileRequest;
import me.cryptforge.mindset.model.Course;
import me.cryptforge.mindset.model.File;
import me.cryptforge.mindset.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.SQLException;
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

    @RequestMapping(value = "/edit/certification", method = RequestMethod.POST)
    public void editCertification(@RequestParam("id") Long id,
                              @RequestParam("file") MultipartFile file) {
        courseService.addCertification(id, file);
    }

    @GetMapping(value = "/get/certification/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getCertification(@PathVariable String id, HttpServletResponse resp) {
        File file = courseService.getCertification(id);
        try {
            return file.getFile().getBinaryStream().readAllBytes();
        } catch (IOException | SQLException e) {
            throw new RuntimeException(e);
        }
    }

}
