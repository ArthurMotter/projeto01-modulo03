package com.abutua.student_backend.models;

public class Course {
    // Properties
    private int id;
    private String name;

    // Construtors
    public Course(int id, String name) {
        this.id = id;
        this.name = name;
    }

    // Methods
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}