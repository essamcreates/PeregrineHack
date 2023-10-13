package com.hackathon.server.models.dtos;

public class AnsweredQuestionDTO {

    private String chosenOption;

    private Long dailyQuestionId;

    private Long userId;

    public AnsweredQuestionDTO() {
    }

    public AnsweredQuestionDTO(String chosenOption, Long dailyQuestionId, Long userId) {
        this.chosenOption = chosenOption;
        this.dailyQuestionId = dailyQuestionId;
        this.userId = userId;
    }

    public String getChosenOption() {
        return chosenOption;
    }

    public void setChosenOption(String chosenOption) {
        this.chosenOption = chosenOption;
    }

    public Long getDailyQuestionId() {
        return dailyQuestionId;
    }

    public void setDailyQuestionId(Long dailyQuestionId) {
        this.dailyQuestionId = dailyQuestionId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
