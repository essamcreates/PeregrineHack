package com.hackathon.server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "mental_health_conditions")
public class MhCondition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private MentalHealthCondition mentalHealthCondition;

    @ManyToMany(mappedBy = "mentalHealthConditions")
    @JsonIgnoreProperties({"mhCondition"})
    private List<User> users;

    public MhCondition() {
    }

    public MhCondition(MentalHealthCondition mentalHealthCondition) {
        this.mentalHealthCondition = mentalHealthCondition;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MentalHealthCondition getMentalHealthCondition() {
        return mentalHealthCondition;
    }

    public void setMentalHealthCondition(MentalHealthCondition mentalHealthCondition) {
        this.mentalHealthCondition = mentalHealthCondition;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
