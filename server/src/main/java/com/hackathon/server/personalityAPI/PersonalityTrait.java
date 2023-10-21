package com.hackathon.server.personalityAPI;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PersonalityTrait {
    private int totalPoints;
    private int points;
    private double percentage;
    private String yourType;
    private String description;

    public PersonalityTrait() {

    }

    @JsonProperty("total_points")
    public int getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }

    @JsonProperty("points")
    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

    @JsonProperty("your_type")
    public String getYourType() {
        return yourType;
    }

    public void setYourType(String yourType) {
        this.yourType = yourType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
