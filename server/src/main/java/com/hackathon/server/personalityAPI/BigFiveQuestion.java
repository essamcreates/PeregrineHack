package com.hackathon.server.personalityAPI;

import jakarta.persistence.*;

@Entity
@Table(name = "big_five_questions")
public class BigFiveQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String question;

    public BigFiveQuestion(){
    }

    public BigFiveQuestion(String question) {
        this.question = question;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
