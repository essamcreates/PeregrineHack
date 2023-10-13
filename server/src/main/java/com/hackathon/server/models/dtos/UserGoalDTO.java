package com.hackathon.server.models.dtos;

import com.hackathon.server.models.Goal;

import java.util.List;

public class UserGoalDTO {

    private List<Long> goalIds;

    public UserGoalDTO() {
    }

//    public UserGoalDTO(List<Long> goalIds) {
//        this.goalIds = goalIds;
//    }

    public List<Long> getGoalIds() {
        return goalIds;
    }

    public void setGoalIds(List<Long> goalIds) {
        this.goalIds = goalIds;
    }
}
