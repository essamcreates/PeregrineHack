package com.hackathon.server.personalityAPI;

import java.util.List;

public class PersonalityTestDTO {

    private int personalityTestId;
    private String title;
    private String description;
    private int lowestRange;
    private int heighestRange;
    private String lowestRangeName;
    private String heighestRangeName;
    private String personalityTestType;
    private String createdAt;
    private String updatedAt;
    private List<PersonalityTestQuestionDTO> personalityTestQuestions;

    public PersonalityTestDTO(int personalityTestId,
                              String title,
                              String description,
                              int lowestRange,
                              int heighestRange,
                              String lowestRangeName,
                              String heighestRangeName,
                              String personalityTestType,
                              String createdAt,
                              String updatedAt,
                              List<PersonalityTestQuestionDTO> personalityTestQuestions) {
        this.personalityTestId = personalityTestId;
        this.title = title;
        this.description = description;
        this.lowestRange = lowestRange;
        this.heighestRange = heighestRange;
        this.lowestRangeName = lowestRangeName;
        this.heighestRangeName = heighestRangeName;
        this.personalityTestType = personalityTestType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.personalityTestQuestions = personalityTestQuestions;
    }

    public int getPersonalityTestId() {
        return personalityTestId;
    }

    public void setPersonalityTestId(int personalityTestId) {
        this.personalityTestId = personalityTestId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getLowestRange() {
        return lowestRange;
    }

    public void setLowestRange(int lowestRange) {
        this.lowestRange = lowestRange;
    }

    public int getHeighestRange() {
        return heighestRange;
    }

    public void setHeighestRange(int heighestRange) {
        this.heighestRange = heighestRange;
    }

    public String getLowestRangeName() {
        return lowestRangeName;
    }

    public void setLowestRangeName(String lowestRangeName) {
        this.lowestRangeName = lowestRangeName;
    }

    public String getHeighestRangeName() {
        return heighestRangeName;
    }

    public void setHeighestRangeName(String heighestRangeName) {
        this.heighestRangeName = heighestRangeName;
    }

    public String getPersonalityTestType() {
        return personalityTestType;
    }

    public void setPersonalityTestType(String personalityTestType) {
        this.personalityTestType = personalityTestType;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<PersonalityTestQuestionDTO> getPersonalityTestQuestions() {
        return personalityTestQuestions;
    }

    public void setPersonalityTestQuestions(List<PersonalityTestQuestionDTO> personalityTestQuestions) {
        this.personalityTestQuestions = personalityTestQuestions;
    }

//    public class PersonalityTestQuestionDTO{
//        private int personalityTestId;
//        private String question;
//        private int personalityTestQuestionId;
//
//        public PersonalityTestQuestionDTO(int personalityTestId, String question, int personalityTestQuestionId) {
//            this.personalityTestId = personalityTestId;
//            this.question = question;
//            this.personalityTestQuestionId = personalityTestQuestionId;
//        }
//
//        public int getPersonalityTestId() {
//            return personalityTestId;
//        }
//
//        public void setPersonalityTestId(int personalityTestId) {
//            this.personalityTestId = personalityTestId;
//        }
//
//        public String getQuestion() {
//            return question;
//        }
//
//        public void setQuestion(String question) {
//            this.question = question;
//        }
//
//        public int getPersonalityTestQuestionId() {
//            return personalityTestQuestionId;
//        }
//
//        public void setPersonalityTestQuestionId(int personalityTestQuestionId) {
//            this.personalityTestQuestionId = personalityTestQuestionId;
//        }
//    }
}
