package com.abutua.student_backend.resources;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.abutua.student_backend.models.Student;

@RestController
@CrossOrigin
public class StudentController {

    /* Students Instances */
    private List<Student> students = new ArrayList<>();

    /* Save an specific student by request */
    @PostMapping("students")
    public ResponseEntity<Student> save(@RequestBody Student student) {
        student.setId(students.size() + 1);
        students.add(student);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(student.getId())
                .toUri();

        return ResponseEntity.created(location).body(student);
    }

    /* Return an specific student by its ID */
    @GetMapping("students/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable int id) {

        Student stud = students.stream()
                .filter(p -> p.getId() == id)
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        return ResponseEntity.ok(stud);
    }

    // Get all students
    @GetMapping("/students")
    public List<Student> getStudents() {
        return this.students;
    }
}