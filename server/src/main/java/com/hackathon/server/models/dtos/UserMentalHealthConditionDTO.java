package com.hackathon.server.models.dtos;

import java.util.List;

public class UserMentalHealthConditionDTO {

    private List<Long> MentalHealthConditionIds;

    public UserMentalHealthConditionDTO() {
    }

//    public UserMentalHealthConditionDTO(List<Long> MentalHealthConditionIds) {
//        this.MentalHealthConditionIds = MentalHealthConditionIds;
//    }

    public List<Long> getMentalHealthConditionIds() {
        return MentalHealthConditionIds;
    }

    public void setMentalHealthConditionIds(List<Long> MentalHealthConditionIds) {
        this.MentalHealthConditionIds = MentalHealthConditionIds;
    }

}
