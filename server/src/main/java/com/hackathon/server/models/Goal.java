package com.hackathon.server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hackathon.server.models.enums.GoalENUM;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "goals")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    @Enumerated(EnumType.STRING)
    private GoalENUM goal;

    @ManyToMany(mappedBy = "careerGoals")
    @JsonIgnoreProperties({"goal"})
    private List<User> users;

    public Goal() {
    }

    public Goal(GoalENUM goal) {
        this.goal = goal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public GoalENUM getGoal() {
        return goal;
    }

    public void setGoal(GoalENUM goal) {
        this.goal = goal;
    }

}

