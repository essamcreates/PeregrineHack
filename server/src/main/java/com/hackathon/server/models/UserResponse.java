package com.hackathon.server.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "user_responses")
public class UserResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    //private USER USER

    @Column
    private String userPrompt;

    @Column
    private String responseText;

    @Column
    private LocalDate dateTime;

    public UserResponse() {
    }

    public UserResponse(String userPrompt, String responseText, LocalDate dateTime) {
        this.userPrompt = userPrompt;
        this.responseText = responseText;
        this.dateTime = dateTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserPrompt() {
        return userPrompt;
    }

    public void setUserPrompt(String userPrompt) {
        this.userPrompt = userPrompt;
    }

    public String getResponseText() {
        return responseText;
    }

    public void setResponseText(String responseText) {
        this.responseText = responseText;
    }

    public LocalDate getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDate dateTime) {
        this.dateTime = dateTime;
    }
}
