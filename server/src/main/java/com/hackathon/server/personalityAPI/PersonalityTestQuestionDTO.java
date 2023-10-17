package com.hackathon.server.personalityAPI;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PersonalityTestQuestionDTO{
    @JsonProperty("personality_test_id")
    private int personalityTestId;
    private String question;
    @JsonProperty("personality_test_question_id")
    private int personalityTestQuestionId;

    public PersonalityTestQuestionDTO(int personalityTestId, String question, int personalityTestQuestionId) {
        this.personalityTestId = personalityTestId;
        this.question = question;
        this.personalityTestQuestionId = personalityTestQuestionId;
    }

    @Override
    public String toString() {
        return "PersonalityTestQuestionDTO{" +
                "personalityTestId=" + personalityTestId +
                ", question='" + question + '\'' +
                ", personalityTestQuestionId=" + personalityTestQuestionId +
                '}';
    }

    public PersonalityTestQuestionDTO() {

    }

    public int getPersonalityTestId() {
        return personalityTestId;
    }

    public void setPersonalityTestId(int personalityTestId) {
        this.personalityTestId = personalityTestId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public int getPersonalityTestQuestionId() {
        return personalityTestQuestionId;
    }

    public void setPersonalityTestQuestionId(int personalityTestQuestionId) {
        this.personalityTestQuestionId = personalityTestQuestionId;
    }
}