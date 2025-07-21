package com.abutua.student_backend.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abutua.student_backend.models.Course;

@RestController
@CrossOrigin
public class CourseController {

    private List<Course> courses = new ArrayList<>();

    // Init courses
    public CourseController() {
        courses.add(new Course(1, "Ciência da Computação"));
        courses.add(new Course(2, "Engenharia de Software"));
        courses.add(new Course(3, "Sistemas de Informação"));
    }

    // Get all courses
    @GetMapping("/courses")
    public List<Course> getCourses() {
        return this.courses;
    }
}