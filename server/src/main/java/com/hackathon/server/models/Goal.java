package com.hackathon.server.models;

public class Goal {

    private Long id;

    private String goal;

    public Goal() {
    }

    public Goal(Long id, String goal) {
        this.id = id;
        this.goal = goal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

}

