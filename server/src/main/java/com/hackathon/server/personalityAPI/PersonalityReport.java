package com.hackathon.server.personalityAPI;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PersonalityReport {

    private PersonalityTrait openness;
    private PersonalityTrait conscientiousness;
    private PersonalityTrait extroversion;
    private PersonalityTrait agreeableness;
    private PersonalityTrait neuroticism;
    private int report_id;

    public PersonalityReport() {

    }

//    GETTERS AND SETTERS

    @JsonProperty("Openness")
    public PersonalityTrait getOpenness() {
        return openness;
    }

    public void setOpenness(PersonalityTrait openness) {
        this.openness = openness;
    }

    @JsonProperty("Conscientiousness")
    public PersonalityTrait getConscientiousness() {
        return conscientiousness;
    }

    public void setConscientiousness(PersonalityTrait conscientiousness) {
        this.conscientiousness = conscientiousness;
    }

    @JsonProperty("Extroversion")
    public PersonalityTrait getExtroversion() {
        return extroversion;
    }

    public void setExtroversion(PersonalityTrait extroversion) {
        this.extroversion = extroversion;
    }

    @JsonProperty("Agreeableness")
    public PersonalityTrait getAgreeableness() {
        return agreeableness;
    }

    public void setAgreeableness(PersonalityTrait agreeableness) {
        this.agreeableness = agreeableness;
    }

    @JsonProperty("Neuroticism")
    public PersonalityTrait getNeuroticism() {
        return neuroticism;
    }

    public void setNeuroticism(PersonalityTrait neuroticism) {
        this.neuroticism = neuroticism;
    }

    public int getReport_id() {
        return report_id;
    }

    public void setReport_id(int report_id) {
        this.report_id = report_id;
    }
}
