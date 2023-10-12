package com.hackathon.server.models;

import java.time.LocalDate;

public class UserResponse {

    private Long id;

    //private USER USER

    private String userPrompt;

    private String responseText;

    private LocalDate dateTime;

    public UserResponse() {
    }

    public UserResponse(Long id, String userPrompt, String responseText, LocalDate dateTime) {
        this.id = id;
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
