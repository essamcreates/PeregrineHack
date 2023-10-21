package com.hackathon.server.models.dtos;

import java.util.List;

public class UserAccessNeedDTO {

    private List<Long> AccessNeedIds;

    public UserAccessNeedDTO() {
    }

    public UserAccessNeedDTO(List<Long> AccessNeedIds) {
        this.AccessNeedIds = AccessNeedIds;
    }

    public List<Long> getAccessNeedIds() {
        return AccessNeedIds;
    }

    public void setAccessNeedIds(List<Long> AccessNeedIds) {
        this.AccessNeedIds = AccessNeedIds;
    }

}
