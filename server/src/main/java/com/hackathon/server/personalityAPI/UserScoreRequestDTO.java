package com.hackathon.server.personalityAPI;

import java.util.List;
import java.util.Map;

public class UserScoreRequestDTO {

    private Long userId;
    private List<Map<Long, Integer>> questionAnswers;

    public UserScoreRequestDTO(){}

    public UserScoreRequestDTO(Long userId, List<Map<Long, Integer>> questionAnswers) {
        this.userId = userId;
        this.questionAnswers = questionAnswers;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<Map<Long, Integer>> getQuestionAnswers() {
        return questionAnswers;
    }

    public void setQuestionAnswers(List<Map<Long, Integer>> questionAnswers) {
        this.questionAnswers = questionAnswers;
    }
}
