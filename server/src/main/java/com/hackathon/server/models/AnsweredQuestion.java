package com.hackathon.server.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "answered_questions")
public class AnsweredQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String chosenOption;

    @ManyToOne
    @JoinColumn(name = "daily_question_id")
    private DailyQuestion dailyQuestion;

    @ManyToOne
    @JsonIgnoreProperties("answeredQuestion")
    private User user;

    public AnsweredQuestion() {
    }

    public AnsweredQuestion(String chosenOption, DailyQuestion dailyQuestion, User user) {
        this.chosenOption = chosenOption;
        this.dailyQuestion = dailyQuestion;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getChosenOption() {
        return chosenOption;
    }

    public void setChosenOption(String chosenOption) {
        this.chosenOption = chosenOption;
    }

    public DailyQuestion getDailyQuestion() {
        return dailyQuestion;
    }

    public void setDailyQuestion(DailyQuestion dailyQuestion) {
        this.dailyQuestion = dailyQuestion;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
