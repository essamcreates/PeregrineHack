package com.hackathon.server.personalityAPI;

public class PersonalityTestQuestionDTO{
    private int personalityTestId;
    private String question;
    private int personalityTestQuestionId;

    public PersonalityTestQuestionDTO(int personalityTestId, String question, int personalityTestQuestionId) {
        this.personalityTestId = personalityTestId;
        this.question = question;
        this.personalityTestQuestionId = personalityTestQuestionId;
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