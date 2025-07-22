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
        courses.add(new Course(1, "Java"));
        courses.add(new Course(2, "Angular"));
        courses.add(new Course(3, "React"));
        courses.add(new Course(4, "JavaScript"));
        courses.add(new Course(5, "Desenvolvimento Web"));
    }

    // Get all courses
    @GetMapping("/courses")
    public List<Course> getCourses() {
        return this.courses;
    }
}