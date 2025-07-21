package com.abutua.student_backend.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abutua.student_backend.models.Student;

@RestController
public class StudentController {

    private List<Student> students = new ArrayList<>();

    // Init students
    public StudentController() {
        students.add(new Student(1, "Ana Silva", "ana.silva@example.com", "11987654321", 1, 3));
        students.add(new Student(2, "Bruno Costa", "bruno.costa@example.com", "21912345678", 2, 1));
        students.add(new Student(3, "Carlos Dias", "carlos.dias@example.com", "31988887777", 1, 5));
    }

    // Get all students
    @GetMapping("/students")
    public List<Student> getStudents() {
        return this.students;
    }
}