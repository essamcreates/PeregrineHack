package com.hackathon.server.models.dtos;

import java.time.LocalDate;

public class UserResponseDTO {

    private String userPrompt;
    private String responseText;
    private LocalDate dateTime;

    public UserResponseDTO() {
    }

    public UserResponseDTO(String userPrompt, String responseText, LocalDate dateTime) {
        this.userPrompt = userPrompt;
        this.responseText = responseText;
        this.dateTime = dateTime;
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
