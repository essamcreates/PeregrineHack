package com.hackathon.server.models;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class BigFiveTrait {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long Id;

    @Column
    private double openness;
    @Column
    private double consientiousness;
    @Column
    private double extraversion;
    @Column
    private double agreeableness;
    @Column
    private double neuroticism;

    @OneToOne
    private User user;

    public BigFiveTrait() {
    }

    public BigFiveTrait(double openness, double consientiousness, double extraversion, double agreeableness, double neuroticism, User user) {
        this.openness = openness;
        this.consientiousness = consientiousness;
        this.extraversion = extraversion;
        this.agreeableness = agreeableness;
        this.neuroticism = neuroticism;
        this.user = user;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public double getOpenness() {
        return openness;
    }

    public void setOpenness(double openness) {
        this.openness = openness;
    }

    public double getConsientiousness() {
        return consientiousness;
    }

    public void setConsientiousness(double consientiousness) {
        this.consientiousness = consientiousness;
    }

    public double getExtraversion() {
        return extraversion;
    }

    public void setExtraversion(double extraversion) {
        this.extraversion = extraversion;
    }

    public double getAgreeableness() {
        return agreeableness;
    }

    public void setAgreeableness(double agreeableness) {
        this.agreeableness = agreeableness;
    }

    public double getNeuroticism() {
        return neuroticism;
    }

    public void setNeuroticism(double neuroticism) {
        this.neuroticism = neuroticism;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
