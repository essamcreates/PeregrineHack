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




//    private DailyQuestion dailyQuestion;
//
//   private User user;
//

    @ManyToOne
    @JsonIgnoreProperties("answeredQuestion")
    private User user;

    public AnsweredQuestion() {
    }

    public AnsweredQuestion(String chosenOption) {
        this.chosenOption = chosenOption;
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
}
