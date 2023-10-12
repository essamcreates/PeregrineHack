package com.hackathon.server.models;

import jakarta.persistence.*;


import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {

    // COLUMNS
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String name;

    @Column
    private LocalDate dateOfBirth; // COULD JUST MAKE THIS A STRING?

    @Column
    private String password;

    @Column
    private String gender;

    @Column
    private PersonalityType personalityType;

    // RELATIONS
    /*
    TODO:
    - do the getters and setters for these
    - update the constructor too if needed

    - accessNeeds
    - careerGoals
    - mood
     */

    public User() {
    }

    public User(String name, LocalDate dateOfBirth, String password, String gender, PersonalityType personalityType) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.gender = gender;
        this.personalityType = personalityType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public PersonalityType getPersonalityType() {
        return personalityType;
    }

    public void setPersonalityType(PersonalityType personalityType) {
        this.personalityType = personalityType;
    }
}
