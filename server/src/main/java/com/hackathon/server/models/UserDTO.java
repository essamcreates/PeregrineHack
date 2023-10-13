package com.hackathon.server.models;

import jakarta.persistence.Column;

import java.time.LocalDate;

public class UserDTO {

    private String name;

    private LocalDate dateOfBirth;

    private String password;

    private String gender;

    public UserDTO() {
    }

    public UserDTO(String name, LocalDate dateOfBirth, String password, String gender) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.gender = gender;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
